import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { User, UserBody } from 'src/app/interface';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsersService } from '../../services/users.service';

import { NewUserComponent } from './new-user.component';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let userService: UsersService;
  let dialogService: DialogService;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<NewUserComponent>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogref', ['close']);
    await TestBed.configureTestingModule({
      declarations: [NewUserComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: dialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    dialogService = TestBed.inject(DialogService);
    userService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`Creating a new user`, () => {
    let userServiceSpy: jasmine.Spy;
    let dialogServiceSpy: jasmine.Spy;
    let user: User;

    beforeEach(() => {
      user= {
        id: 123,
        name: 'test name',
        email: 'test@email',
        gender: 'female',
        status: 'active',
      };
      component.newUserForm.setValue({
        name: 'Test name',
        email: 'test@email',
        gender: 'female'
      })
      userServiceSpy = spyOn(userService, 'newUser').and.returnValue(of(user));
      dialogServiceSpy = spyOn(dialogService, 'drawDialog');
      component.onSubmitNewUser();
    });
    it(`should call userService`, ()=> {
      expect(userServiceSpy).toHaveBeenCalled()
    })
    it(`should create a dialog when user is created`, () => {
      expect(dialog).toBeTruthy();
      expect(dialogServiceSpy).toHaveBeenCalledWith(dialog, {
        title: `Nuovo utente creato con successo`,
        body: '',
        isDenialNeeded: false,
      });
    });
  });

  describe(`Receiving an error after creating post`, () => {
    let userServiceErrorSpy: jasmine.Spy;
    let dialogServicespy: jasmine.Spy;

    beforeEach(() => {
      userServiceErrorSpy = spyOn(userService, 'newUser');
      dialogServicespy = spyOn(dialogService, 'drawDialog');
    });
    it(`should show a dialog if missing some data or user exist`, () => {
      userServiceErrorSpy.and.returnValue(throwError({ status: 422 }));
      component.onSubmitNewUser();
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Dati mancanti o l'utente esiste già`,
        isDenialNeeded: false,
      });
    });

    it(`should show a dialog if there is an error server`, () => {
      userServiceErrorSpy.and.returnValue(throwError({ status: 0 }));
      component.onSubmitNewUser();
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore del server`,
        isDenialNeeded: false,
      });
    });
    it(`should show a dialog if there is an error`, () => {
      userServiceErrorSpy.and.returnValue(throwError({ status: 123 }));
      component.onSubmitNewUser();
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore sconosciuto`,
        isDenialNeeded: false,
      });
    });
  });
});
