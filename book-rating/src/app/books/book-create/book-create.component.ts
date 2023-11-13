import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  // "nimm den Typ aller Schlüssel von bookForm.controls"
  isInvalid(controlName: keyof typeof this.bookForm.controls): boolean {
    const control = this.bookForm.controls[controlName];

    /*const control2 = this.bookForm.get(controlName);

    if (!control2) {
      return false;
    }*/

    return control.touched && control.invalid;
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
