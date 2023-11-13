import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting }
    from '@angular/common/http/testing';

import { BookStoreService } from './book-store.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('BookStoreService', () => {
  let service: BookStoreService;

  beforeEach(() => {

    // so könnte ein Stub für den HttpClient aussehen
    const httpMock = {
      get: () => of([]),
      post: () => of()
    }

    TestBed.configureTestingModule({
      providers: [
        // { provide: HttpClient, useValue: httpMock }
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BookStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
