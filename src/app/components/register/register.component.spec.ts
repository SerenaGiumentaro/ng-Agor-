import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/my-errorstatematcher';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        MyErrorStateMatcher,
        provideRouter([{ path: 'login', component: LoginComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a request with the expected body', () => {
    component.registerForm.setValue({
      name: 'Test Test',
      email: 'test@test.com',
      token: 'TestToken',
      gender: '',
    });

    component.onSubmit();
    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/users'
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      name: 'Test Test',
      email: 'test@test.com',
      gender: '',
      status: 'active',
    });
    expect(req.request.headers.get('Authorization')).toEqual(
      'Bearer TestToken'
    );
  });

  it('should display error if user exist and should not have data in localstorage', () => {
    component.registerForm.setValue({
      name: 'Test Test',
      email: 'test@test.com',
      token: 'TestToken',
      gender: '',
    });

    component.onSubmit();
    console.log(localStorage.getItem('token'));
    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/users'
    );

    // Mock the HTTP response
    req.flush(
      { error: 'User already exist' },
      { status: 422, statusText: 'Unprocessable Entity' }
    );
    expect(localStorage.getItem('token')).toBe(null);
    expect(localStorage.getItem('user_id')).toBe(null);
    // experct error to be displayed
    // expect(window.alert).toHaveBeenCalledWith(`L'utente esiste già`)
  });

  it('should display an error if token is not valid', () => {
    component.registerForm.setValue({
      name: 'Test Test',
      email: 'test@test.com',
      token: 'TestTokenInvalid',
      gender: '',
    });
    component.onSubmit();
    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/users'
    );
    req.flush(
      { error: 'Authentication failed' },
      { status: 401, statusText: 'Authentication failed' }
    );
    expect(localStorage.getItem('token')).toBe(null);
    expect(localStorage.getItem('user_id')).toBe(null);

    // aggiungere test per lo show error
  });

  it('should create a new user', () => {
    component.registerForm.setValue({
      name: 'Test Test',
      email: 'test@test.com',
      token: 'TestToken',
      gender: '',
    });

    component.onSubmit();

    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/users'
    );
    const mockResponseNewUserCreated = {
      id: 111,
      name: 'Test Test',
      email: 'test@test.com',
      gender: '',
      status: 'active',
    };
    req.flush(mockResponseNewUserCreated);
    expect(localStorage.getItem('user_id')).toEqual('111');
    expect(localStorage.getItem('token')).toEqual('TestToken');
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    // testa la segnalazione che l'utente è stato creato
  });

  afterEach(() => {
    localStorage.clear();
  });
});
