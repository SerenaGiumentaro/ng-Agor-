import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let httpClient: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    guard = TestBed.inject(AuthGuard);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
