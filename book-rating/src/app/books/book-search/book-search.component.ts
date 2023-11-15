import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';
import { Observable, debounceTime, filter, switchMap } from 'rxjs';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  books$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    filter(term => term.length >= 3),
    switchMap(term => this.bs.search(term))
  );

  constructor(private bs: BookStoreService) {}
}
