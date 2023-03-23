import {
  HttpClient,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;
  const HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useValue: HttpClientSpy },
      ],
    });
    loginService = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });
});
