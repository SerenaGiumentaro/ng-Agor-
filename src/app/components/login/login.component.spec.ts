import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { provideRouter, Router } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loginService: LoginService;
  let route: Router;
  let navigateSpy: jasmine.Spy
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ErrorStateMatcher,
        provideRouter([{ path: 'dashboard', component: DashboardComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
    route = TestBed.inject(Router);
    navigateSpy = spyOn(route, 'navigate')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if email input is not valid', () => {
    const emailInput = fixture.debugElement.query(
      By.css('input[type="email"]')
    ).nativeElement;
    emailInput.value = 'invalidEmail';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.directive(MatError));
    expect(errorElement).not.toBeNull();
    expect(errorElement.nativeElement.innerText).toContain(
      'Inserisci un indirizzo email valido'
    );
  });

  it('should display error if token input is not valid', () => {
    const tokenInput = fixture.debugElement.query(
      By.css('input[formControlName="token"]')
    ).nativeElement;
    tokenInput.value = 'i';
    tokenInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    expect(component.loginForm.get('token')?.valid).toBe(false);
    const errorElement = fixture.debugElement.query(By.directive(MatError));
    expect(errorElement).not.toBeNull();
    expect(errorElement.nativeElement.innerText).toContain(
      'Il token deve contenere 64 caratteri'
    );
  });


describe('Login success tests', ()=> {

  beforeEach(()=> {
    component.loginForm.setValue({
      email: 'email@test',
      token: 'validToken',
    });

    component.onSubmit();
    const params = new HttpParams().set(
      'email',
      component.loginForm.value.email
    );
    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/users?' + 'email=' + params.get('email')
    );
    const mockResponseIsLogin = [
      {
        id: 111,
        name: 'Test Test',
        email: 'email@test',
        gender: '',
        status: 'active',
      },
    ];
    req.flush(mockResponseIsLogin);
  })

  it('should save the token and the user_id in the local storage', ()=> {
    expect(localStorage.getItem('token')).toEqual('validToken');
    expect(localStorage.getItem('user_id')).toEqual('111');
  })

  it('user should result logged in after login success', ()=> {
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
  })

  it('should navigate to dashboard after the login success', ()=> {
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard'])
  })
})

  it(`should not save the token and the user id if receive an error response`, () => {
    component.loginForm.setValue({
      email: 'email@test',
      token: 'invalidToken',
    });

    component.onSubmit();
    const params = new HttpParams().set(
      'email',
      component.loginForm.value.email
    );
    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/users?' + 'email=' + params.get('email')
    );
    // the API send an empty array and not an error state even if the token is not valid
    req.flush([]);
    expect(localStorage.getItem('token')).toEqual(null);
    expect(localStorage.getItem('user_id')).toBe(null);
    expect(localStorage.getItem('isLoggedIn')).toBe(null);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
