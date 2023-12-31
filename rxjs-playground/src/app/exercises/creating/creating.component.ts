import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Frankfurt', 'Hamburg', 'München', 'Leipzig')
    // from([1,2,3,4,5,6,7])
    // interval(1000)    // ---0---1---2---3---4---5---6 ...
    // timer(1000, 1000) // ---0---1---2---3---4---5---6 ...
    // timer(3000)       // ---------0|
    // timer(3000, 1000) // ---------0---1---2---3---4---5---6 ...
    // timer(0, 1000)    // 0---1---2---3---4---5---6 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(100), 2000);
      setTimeout(() => sub.next(500), 4000);
      setTimeout(() => sub.complete(), 6000);
    }

    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.log('ERROR:', err),
      complete: () => console.log('COMPLETE')
    };

    // Finnische Notation
    const myObs$ = new Observable(producer);


    const myObs2$ = new Observable(sub => {
      sub.next(1);
    });

    ////////////////////////////////////////////////

    // producer(obs);
    // myObs$.subscribe(obs);

    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
