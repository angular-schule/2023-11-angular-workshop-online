import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { concatMap, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book?: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn') // path: 'books/:isbn'

    // PUSH
    this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      switchMap(isbn => this.bs.getSingle(isbn))
    ).subscribe(book => {
      this.book = book;
    })

  }
}
