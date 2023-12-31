import { Component, TrackByFunction, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book.actions';
import { map } from 'rxjs';
import { selectBookList } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];
  // booksS = signal<Book[]>([]);

  minRating = this.rs.MIN_RATING;
  maxRating = this.rs.MAX_RATING;

  private rs2 = inject(BookRatingService);

  trackBook: TrackByFunction<Book> = (index, book) => {
    return book.isbn;
  }

  constructor(private rs: BookRatingService, private bs: BookStoreService, private store: Store) {
    this.store.dispatch(BookActions.loadBooks());

    // TODO: AsyncPipe im Template
    this.store.select(selectBookList).subscribe(books => {
      this.books = books;
      // this.booksS.set(books);
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  doDelete(isbn: string) {
    this.bs.delete(isbn).subscribe(() => {
      this.bs.getAll().subscribe(books => this.books = books);
    })
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5].map(e => e) // [1, 2, 3, 4, 5]
    // [1,2,3,4,5].filter(e => e > 3) // [4, 5]
    // [1,2,3,4,5].find()


    const newBookList = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });

    this.books = newBookList;
    // this.booksS.set(newBookList);
  }
}


/*
TODO:
- Datenmodell
- Daten
- Anzeige / HTML
*/


