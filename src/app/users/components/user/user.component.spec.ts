import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsersService } from '../../services/users.service';
import { UserDataComponent } from '../user-data/user-data.component';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let dialog: MatDialog;
  let userService: UsersService;
  let dialogService: DialogService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        RouterModule,
      ],
      providers: [
        provideRouter([{ path: 'user/:id', component: UserDataComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    userService = TestBed.inject(UsersService);
    dialogService = TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call the dialog for after click on delete user`, () => {
    component.deleteUser();
    expect(dialog).toBeTruthy();
  });
  describe(`Deleting user`, () => {
    beforeEach(() => {
      const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRef.afterClosed.and.returnValue(of(true));
      spyOn(dialogService, 'drawDialog').and.returnValue(dialogRef);
    });

    it(`should delete user if answer from dialog is yes`, () => {
      spyOn(userService, 'deleteUser').and.returnValue(of([]));
      component.deleteUser();
      expect(userService.deleteUser).toHaveBeenCalledWith(component.user.id);
    });

    it(`should show a dialog after deleted user`, () => {
      spyOn(userService, 'deleteUser').and.returnValue(of([]));
      component.deleteUser();
      expect(dialogService.drawDialog).toHaveBeenCalledWith(dialog, {
        title: 'Utente eliminato',
        body: '',
        isDenialNeeded: false,
      });
    });

    it(`should show a dialog error if server doesn't work`, () => {
      spyOn(userService, 'deleteUser').and.returnValue(
        throwError({ status: 0, message: `Errore del server` })
      );
      component.deleteUser();
      expect(dialogService.drawDialog).toHaveBeenCalledWith(dialog, {
        title: 'Errore dal server',
        body: '',
        isDenialNeeded: false,
      });
    });
  });

  it(`should send user data after click on user name`, () => {
    const userNameLink = fixture.debugElement.query(
      By.css('.user-data a')
    ).nativeElement;
    userNameLink.dispatchEvent(new Event('click'));
    expect(userService.selectedUser).toEqual(component.user);
  });
});
