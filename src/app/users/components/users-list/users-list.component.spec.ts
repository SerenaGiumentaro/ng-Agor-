import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/interface';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsersService } from '../../services/users.service';
import { UsersListComponent } from './users-list.component';

describe('UsersComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let dialogService: DialogService;
  let userService: UsersService;
  let dialog: MatDialog;
  let dialogNewUser: MatDialog;
  const allUsersMockResponse: HttpResponse<User[]> = new HttpResponse({
    body: [
      {
        id: 123,
        name: 'test name',
        email: 'email test',
        gender: 'female',
        status: 'active',
      },
    ],
    headers: new HttpHeaders({ 'x-pagination-total': '10' }),
  });
  const allUserMockNoResultResponse: HttpResponse<User[]> = new HttpResponse({
    body: [],
    headers: new HttpHeaders({ 'x-pagination-total': '0' }),
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonToggleModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    dialogService = TestBed.inject(DialogService);
    dialog = TestBed.inject(MatDialog);
    dialogNewUser = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering all users', () => {
    const pageIndex = 1;
    const pageSize = 10;
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = pageIndex;
    pageEvent.pageSize = pageSize;
    let getAllUsersSpy: jasmine.Spy;
    it(`should render all users`, () => {
      getAllUsersSpy = spyOn(component, 'getAllUsers');
      component.handlePageEvent(pageEvent);
      expect(component.searchUserForm).toBeTruthy();
      expect(component.searchUserForm.value.typeOfSearch).toEqual('name');
      expect(getAllUsersSpy).toHaveBeenCalledWith(pageIndex, pageSize);
    });

   it(`should render data from user service`, () => {
      spyOn(userService, 'getAllUsers').and.returnValue(
        of(allUsersMockResponse)
      );
      component.getAllUsers(pageIndex, pageSize);
      expect(component.users).toEqual(allUsersMockResponse.body);
      expect(component.lenghtUsers).toEqual('10');
    });

    it(`should render a dialog error response after http fail`, () => {
      spyOn(userService, 'getAllUsers').and.returnValue(
        throwError(() => new Error('status: 0, message: "Errore del server"'))
      );
      const dialogSpy = spyOn(dialog, 'open')
      component.getAllUsers(pageIndex, pageSize);
      expect(component.users).toEqual(undefined);
      expect(dialogSpy).toHaveBeenCalled()
    });
  });

  it(`should open new-user dialog after click on add new user button`, ()=> {
    const addNewUserBtn = fixture.debugElement.query(By.css('.add-user-btn')).nativeElement
    const dialogNewUserpy = spyOn(dialogNewUser, 'open')
    addNewUserBtn.click()
    expect(dialogNewUserpy).toHaveBeenCalled()
  })
});
