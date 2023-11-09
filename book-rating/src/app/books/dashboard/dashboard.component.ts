import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.9
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 36.9
      }
    ];
  }

  doRateUp(book: Book) {
    console.log('UP', book);
  }

  doRateDown(book: Book) {
    console.log('DOWN', book);
  }
}


/*
TODO:
- Datenmodell
- Daten
- Anzeige / HTML
*/


