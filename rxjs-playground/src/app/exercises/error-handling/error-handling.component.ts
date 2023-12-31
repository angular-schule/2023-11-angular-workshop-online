import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Observable } from 'rxjs';

import { ExerciseService } from '../exercise.service';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './error-handling.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  start() {
    this.es.randomError().pipe(
      catchError(err => {
        console.log(err);

        ///////////
        // Fehler ersetzen durch normale next-Elemente
        // return of('Nichts', 'passiert', '😇');

        // Fehler ignorieren
        // return new Observable(sub => sub.complete());
        // return EMPTY;

        // Fehler weiterwerfen
        // return throwError(() => 'BÖSER FEHLER! 🤬');
        // throw err;
        throw 'DAS IST EIN FEHLER! 😡';
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
