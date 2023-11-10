import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
      MAX_RATING: 5,
      MIN_RATING: 1,
    };

    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: wenn jemand den Service anfordert,
        // wird stattdessen der ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    });
    // Template + TS-Instanz
    fixture = TestBed.createComponent(DashboardComponent);

    // TS-Instanz
    component = fixture.componentInstance;

    // Host-Element / DOM
    // fixture.nativeElement.querySelectorAll('app-book')

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {
    // Arrange
    // Instanz von BRS (das ist eigentlich der ratingMock von oben)
    const service = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '123' } as Book;

    // Methode überwachen
    // spyOn(service, 'rateUp');
    // spyOn(service, 'rateUp').and.returnValue(testBook);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    spyOn(service, 'rateUp').and.callThrough();


    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob Service-Methode aufgerufen wurde
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);

  });
});
