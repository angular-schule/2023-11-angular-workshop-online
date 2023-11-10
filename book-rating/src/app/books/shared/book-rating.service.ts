import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  readonly MAX_RATING = 5;
  readonly MIN_RATING = 1;

  constructor() {}

  rateUp(book: Book): Book {
    return {
      ...book, // Spread Operator
      rating: book.rating < 5 ? book.rating + 1 : 5
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(book.rating - 1, 1)
    };
  }
}
