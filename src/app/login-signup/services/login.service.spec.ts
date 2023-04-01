import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { User } from 'src/app/interface';
import { UsersComponent } from 'src/app/users/users.component';
import { LoginSignupComponent } from '../login-signup.component';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let httpMock: HttpTestingController;
  let loginService: LoginService;
  let route: Router;
  const HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useValue: HttpClientSpy },
        provideRouter([
          { path: 'users', component: UsersComponent },
          { path: 'login-signup', component: LoginSignupComponent },
        ]),
      ],
      imports: [HttpClientTestingModule],
    });
    loginService = TestBed.inject(LoginService);
    route = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    const routeSpy = spyOn(route, 'navigate');
    const isLoggedSpy = spyOn(loginService.isLogged, 'next');
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it(`should change isLogged value when login and route to users`, () => {
    loginService.login();
    expect(route.navigate).toHaveBeenCalledOnceWith(['users']);
  });

  it(`should change isLogged value in false and route to login-signup`, () => {
    loginService.logout();
    expect(route.navigate).toHaveBeenCalledOnceWith(['login-signup']);
    expect(localStorage.length).toEqual(0);
  });

  it(`should return current user`, () => {
    loginService.currentUser = [
      {
        id: 0,
        name: 'test name',
        email: 'test emil',
        gender: 'male',
        status: 'active',
      },
    ];
    let mockUser: User[] = loginService.getCurrentUser();
    expect(mockUser[0]).toEqual(loginService.currentUser[0]);
  });

  describe('check user is logged in', () => {
    it('should return false if user is not logged in', () => {
      const expectedValue = false;

      loginService.isLoggedIn().subscribe((res) => {
        expect(res).toEqual(expectedValue);
      });
    });
  });
});
