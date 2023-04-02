import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Post, User } from 'src/app/interface';
import { PostComponent } from 'src/app/posts/components/post/post.component';
import { PostService } from 'src/app/posts/services/post.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserDataComponent } from './user-data.component';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;
  let dialog: MatDialog;
  let dialogService: DialogService;
  let userService: UsersService;
  let postService: PostService;
  let mockUser: User;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDataComponent, UserCardComponent, PostComponent],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: MatDialog, useValue: dialog }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDataComponent);
    userService = TestBed.inject(UsersService);
    postService = TestBed.inject(PostService);
    dialogService = TestBed.inject(DialogService);
    component = fixture.componentInstance;
    mockUser = {
      id: 123,
      name: 'test name',
      email: 'test-email',
      gender: 'female',
      status: 'active',
    };
    const spyGetSelectedUser = spyOn(userService, 'getSelectedUser');
    spyGetSelectedUser.and.returnValue(mockUser);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should receive all user's posts`, () => {
    const spyGetUserPost = spyOn(postService, 'getUserPosts');
    const mockPost: Post[] = [
      {
        id: 123,
        user_id: mockUser.id,
        title: 'test title',
        body: 'test body',
      },
    ];
    spyGetUserPost.and.returnValue(of(mockPost));
    component.ngOnInit();
    expect(component.allPosts).toEqual(mockPost);
  });
  it(`should show "Non ci sono post ancora" if receive an empy array`, () => {
    const spyGetUserPost = spyOn(postService, 'getUserPosts');
    spyGetUserPost.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.message'));
    expect(component.havePost).toBe(false);
    expect(message.nativeElement.textContent).toContain(
      'Non ci sono post ancora'
    );
  });

  describe(`handle errors`, () => {
    let dialogRef: MatDialogRef<DialogComponent>;
    let spyPostService: jasmine.Spy;
    let dialogServiceSpy: jasmine.Spy;
    beforeEach(() => {
      dialogRef = jasmine.createSpyObj('MatDialogRef', ['open']);
      spyPostService = spyOn(postService, 'getUserPosts');
      dialogServiceSpy = spyOn(dialogService, 'drawDialog').and.returnValue(
        dialogRef
      );
    });

    it(`should show a dialog if receive a 404 error`, () => {
      spyPostService.and.returnValue(throwError({ status: 404 }));
      component.ngOnInit();
      postService.getUserPosts(123).subscribe({
        error: (err) => {
          expect(err.status).toEqual(404);
        },
      });
      expect(dialogServiceSpy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Utente sconosciuto`,
        isDenialNeeded: false,
      });
    });

    it(`should show error server dialog on status: 0`, () => {
      spyPostService.and.returnValue(throwError({ status: 0 }));
      component.ngOnInit();
      postService.getUserPosts(123).subscribe({
        error: (err) => {
          expect(err.status).toEqual(0);
        },
      });
      expect(dialogServiceSpy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore del server`,
        isDenialNeeded: false,
      });
    });

    it(`should show a dialog with a general error if it s an unknown error`, () => {
      spyPostService.and.returnValue(throwError({ status: 444 }));
      component.ngOnInit();
      postService.getUserPosts(123).subscribe({
        error: (err) => {
          expect(err.status).toEqual(444);
        },
      });
      expect(dialogServiceSpy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore sconosciuto`,
        isDenialNeeded: false,
      });
    });
  });
});
