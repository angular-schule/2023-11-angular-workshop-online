import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5)
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.max(10000),
        Validators.min(0)
      ]
    })
  });

  constructor(private bs: BookStoreService, private router: Router) {}

  // "nimm den Typ aller Schlüssel von bookForm.controls"
  isInvalid(controlName: keyof typeof this.bookForm.controls): boolean {
    const control = this.bookForm.controls[controlName];

    /*const control2 = this.bookForm.get(controlName);

    if (!control2) {
      return false;
    }*/

    return control.touched && control.invalid;
  }

  hasError(controlName: keyof typeof this.bookForm.controls, errorCode: string): boolean {
    // "Hat dieses Control diesen bestimmten Fehler?"
    const control = this.bookForm.controls[controlName];
    return control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    if (this.bookForm.invalid) {
      return;
    }

    // this.bookForm.value: nur aktivierte Controls
    // this.bookForm.getRawValue(): alle Controls, auch deaktivierte
    const newBook: Book = this.bookForm.getRawValue();

    /*const newBook: Book = {
      ...this.bookForm.getRawValue(),
      price: this.bookForm.getRawValue().price ?? 0
    };*/


    this.bs.create(newBook).subscribe(receivedBook => {
      // this.router.navigate(['/books']); // Dashboard
      this.router.navigate(['/books', receivedBook.isbn]); // Detailseite
    });
  }
}

/*
TODO:
- Fehlermeldungen anzeigen
  - "Die IBSN ist ungültig"
  - "Die ISBN ist zu kurz."
- Button nur aktivieren, wenn Formular gültig
- abschicken
- HTTP
- bei Erfolg:
  - wegnavigieren (Dashboard oder Detailseite)
  - Meldung anzeigen
  - zurücksetzen

*/
