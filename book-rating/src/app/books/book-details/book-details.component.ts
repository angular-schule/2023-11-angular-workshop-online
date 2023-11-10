import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  // ISBN aus der URL lesen
  // Buch abrufen / HTTP
  // Buch anzeigen

  constructor(private route: ActivatedRoute) {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn') // path: 'books/:isbn'

    // PUSH
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      console.log(isbn);
    });
  }
}
