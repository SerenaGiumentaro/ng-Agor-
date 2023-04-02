import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCardSubtitle } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Comment, User } from 'src/app/interface';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsersService } from 'src/app/users/services/users.service';
import { CommentsService } from '../../services/comments.service';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let dialog: MatDialog;
  let userService: UsersService;
  let commentService: CommentsService;
  let dialogService: DialogService;
  const mockUser: User = {
    id: 123,
    name: 'test name',
    email: 'test email',
    gender: 'male',
    status: 'active',
  };
  const mockComment: Comment = {
    id: 123,
    post_id: 123,
    name: 'test name',
    email: 'test email',
    body: 'comment',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    userService = TestBed.inject(UsersService);
    dialog = TestBed.inject(MatDialog);
    commentService = TestBed.inject(CommentsService);
    dialogService = TestBed.inject(DialogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should get user from post_id`, () => {
    const userServiceSpy = spyOn(userService, 'getUser').and.returnValue(
      of(mockUser)
    );
    component.ngOnInit();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(component.user.name).toEqual(mockUser.name);
  });
  it(`should call onSubmitComment after click on submit`, () => {
    const postCommentSpy: jasmine.Spy = spyOn(component, 'onSubmitComment');
    const submitBtn = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    submitBtn.click();
    expect(postCommentSpy).toHaveBeenCalled();
  });

  it(`should show a dialog message if commentService return an error`, () => {
    const err = { status: 0, statusText: 'Errore del server' };
    spyOn(commentService, 'postNewComment').and.returnValue(
      throwError(() => err)
    );
    commentService
      .postNewComment(123, 'test name', 'email test', 'comment')
      .subscribe({
        error: (err) => {
          expect(err.status).toEqual(0);
          expect(err.statusText).toEqual('Errore del server');
        },
      });
  });

  it('should render "Utente sconosciuto" if receive 404 error', () => {
    const userServiceSpy = spyOn(userService, 'getUser').and.returnValue(
      throwError({ status: 404 })
    );
    component.ngOnInit();
    userService.getUser(123).subscribe({
      error: (err) => {
        expect(err.status).toEqual(404);
        expect(component.user.name).toEqual('Utente Sconosciuto');
      },
    });
  });

  describe(`should handle errors`, () => {
    let dialogRef: MatDialogRef<DialogComponent>;
    let spyCommentService: jasmine.Spy;
    let dialogServiceSpy: jasmine.Spy;

    beforeEach(() => {
      dialogRef = jasmine.createSpyObj('MatDialogRef', ['open']);
      spyCommentService = spyOn(commentService, 'postNewComment');
      dialogServiceSpy = spyOn(dialogService, 'drawDialog').and.returnValue(
        dialogRef
      );
    });

    it(`should show a dialog on error status: 422 if some data missing`, () => {
      spyCommentService.and.returnValue(throwError({ status: 422 }));
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
      component.onSubmitComment();
      commentService
        .postNewComment(123, 'test name', 'test@email', 'comment')
        .subscribe({
          error: (err) => {
            expect(err.status).toEqual(422);
          },
        });
      expect(dialogServiceSpy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Dati mancanti`,
        isDenialNeeded: false,
      });
    });

    it(`should show a dialog on error status: 0 if there is an server error`, () => {
      spyCommentService.and.returnValue(throwError({ status: 0 }));
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
      component.onSubmitComment();
      commentService
        .postNewComment(123, 'test name', 'test@email', 'comment')
        .subscribe({
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

    it(`should show a dialog on the others error case`, () => {
      spyCommentService.and.returnValue(throwError({ status: 444 }));
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
      component.onSubmitComment();
      commentService
        .postNewComment(123, 'test name', 'test@email', 'comment')
        .subscribe({
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
