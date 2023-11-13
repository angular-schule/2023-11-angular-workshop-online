import { TestBed } from '@angular/core/testing';

import { BookStoreService } from './book-store.service';
import { of } from 'rxjs';

describe('BookStoreService', () => {
  let service: BookStoreService;

  beforeEach(() => {

    // so könnte ein Stub für den HttpClient aussehen
    const httpMock = {
      get: () => of([])
    }

    TestBed.configureTestingModule({});
    service = TestBed.inject(BookStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
