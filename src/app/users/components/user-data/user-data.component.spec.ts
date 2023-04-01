import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Post, User } from 'src/app/interface';
import { PostComponent } from 'src/app/posts/components/post/post.component';
import { PostService } from 'src/app/posts/services/post.service';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserDataComponent } from './user-data.component';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;
  let dialog: MatDialog
  let userService: UsersService
  let postService: PostService
  let mockUser: User
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataComponent, UserCardComponent , PostComponent],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: MatDialog, useValue: dialog},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataComponent);
    userService = TestBed.inject(UsersService)
    postService = TestBed.inject(PostService)
    component = fixture.componentInstance;
    mockUser = {
      id: 123,
      name: 'test name',
      email:'test-email',
      gender: 'female',
      status: 'active'
    }
    const spyGetSelectedUser = spyOn(userService, 'getSelectedUser')
    spyGetSelectedUser.and.returnValue(mockUser)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should receive all user's posts`, ()=> {
    const spyGetUserPost = spyOn(postService, 'getUserPosts')
    const mockPost: Post[] = [{
      id: 123,
      user_id : mockUser.id,
      title: 'test title',
      body: 'test body'
    }]
    spyGetUserPost.and.returnValue(of(mockPost))
    component.ngOnInit()
    expect(component.allPosts).toEqual(mockPost)
  })
});
