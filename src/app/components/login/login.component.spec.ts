import { HttpClient } from '@angular/common/http';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
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
      providers: [ErrorStateMatcher],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
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
});
