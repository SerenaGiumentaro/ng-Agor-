import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Post, User } from 'src/app/interface';
import { PostService } from 'src/app/posts/services/post.service';
import { PersonalProfileComponent } from './personal-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCardComponent } from 'src/app/users/components/user-card/user-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PostComponent } from 'src/app/posts/components/post/post.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

describe('PersonalProfileComponent', () => {
  let component: PersonalProfileComponent;
  let fixture: ComponentFixture<PersonalProfileComponent>;
  let dialogService: DialogService;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let postServiceMock: jasmine.SpyObj<PostService>;
  let drawDialogMock: jasmine.SpyObj<DialogService>;
  const mockPost: Post[] = [
    {
      id: 1,
      user_id: 1,
      title: 'Post Title',
      body: 'Post Body',
    },
  ];
  beforeEach(async () => {
    postServiceMock = jasmine.createSpyObj('PostService', ['getUserPosts']);
    drawDialogMock = jasmine.createSpyObj('DialogService', ['drawDialog']);
    await TestBed.configureTestingModule({
      declarations: [
        PersonalProfileComponent,
        UserCardComponent,
        PostComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        { provide: MatDialog, useValue: mockDialog },
        { provide: DialogService, useValue: drawDialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalProfileComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render the User data', () => {
    const mockUser: User = {
      name: 'Test User',
      email: 'user@test.com',
      id: 111,
      status: 'active',
      gender: 'female',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    beforeEach(() => {
      postServiceMock.getUserPosts.and.returnValue(of(mockPost));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it(`should set the user with the current user`, () => {
      expect(component.user).toEqual(mockUser);
    });

    it(`should render the user posts`, () => {
      expect(component.allUserPosts).toEqual(mockPost);
    });
  });
  describe('should render a message if there are no post', () => {
    const mockNoPost: Post[] = [];

    it(`should render a error message if there are no posts`, () => {
      postServiceMock.getUserPosts.and.returnValue(of(mockNoPost));
      component.ngOnInit();
      fixture.detectChanges();
      const message = fixture.debugElement.query(
        By.css('div.flex-center.message')
      );
      expect(message.nativeElement.innerText).toEqual(
        'Non ci sono post ancora'
      );
    });
  });

  it(`should show a dialog message for server error`, () => {
    const mockError = new HttpErrorResponse({
      error: 'Server Error',
      status: 0,
      statusText: 'Server Error',
    });
    postServiceMock.getUserPosts.and.returnValue(throwError(() => mockError));
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockError.status).toBe(0);
    expect(component.loading).toEqual(false);
    expect(drawDialogMock.drawDialog).toHaveBeenCalledWith(mockDialog, {
      title: 'Errore dal server',
      body: '',
      isDenialNeeded: false,
    });
  });
});
