import {
  HttpClient,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { UsersComponent } from 'src/app/users/users.component';
import { LoginSignupComponent } from '../login-signup.component';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let route: Router
  const HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useValue: HttpClientSpy },
        provideRouter([
          { path: 'users', component: UsersComponent },
          { path: 'login-signup', component: LoginSignupComponent },
        ])
      ],
    });
    loginService = TestBed.inject(LoginService);
    route = TestBed.inject(Router)
    const routeSpy = spyOn(route, 'navigate')
    const isLoggedSpy = spyOn(loginService.isLogged, 'next')
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it(`should change isLogged value when login and route to users`, ()=> {
    loginService.login()
    expect(route.navigate).toHaveBeenCalledOnceWith(['users'])
    // testare isLogginIn
  })

  it(`should change isLogged value in false and route to login-signup`, ()=> {
    loginService.logout()
    expect(route.navigate).toHaveBeenCalledOnceWith(['login-signup'])
    expect(localStorage.length).toEqual(0)
  })
});
