import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];
  minRating = this.rs.MIN_RATING;
  maxRating = this.rs.MAX_RATING;

  private rs2 = inject(BookRatingService);

  constructor(private rs: BookRatingService) {
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
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5].map(e => e) // [1, 2, 3, 4, 5]
    // [1,2,3,4,5].filter(e => e > 3) // [4, 5]
    // [1,2,3,4,5].find()

    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });
  }
}


/*
TODO:
- Datenmodell
- Daten
- Anzeige / HTML
*/


