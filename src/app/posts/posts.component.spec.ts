import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// import { HttpClient } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatCardContent, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
// import { By } from '@angular/platform-browser';
// import { of } from 'rxjs';
// import { Post, User } from 'src/app/interface';
// import { CommentsService } from 'src/app/services/comments.service';
// import { UsersService } from 'src/app/services/users.service';

// import { PostComponent } from './post.component';

// describe('PostComponent', () => {
//   let component: PostComponent;
//   let fixture: ComponentFixture<PostComponent>;
//   let httpClient: HttpClient
//   let httpTestingController: HttpTestingController
//   let userService: UsersService
//   let commentService: CommentsService
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ PostComponent ],
//       imports: [
//         HttpClientTestingModule,
//         MatCardModule,
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PostComponent);
//     component = fixture.componentInstance;
//     httpClient = TestBed.inject(HttpClient)
//     httpTestingController = TestBed.inject(HttpTestingController)
//     userService = TestBed.inject(UsersService)
//     commentService = TestBed.inject(CommentsService)
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('should render all the posts', ()=> {
//     const mockPost: Post = {
//       id: 1,
//       user_id: 111,
//       title: 'test post',
//       body: 'test body'
//     }

//     const mockUser: User = {
//       name: 'Test User',
//       email: 'user@test.com',
//       id: 111,
//       status: 'active',
//       gender: 'female',
//     };

//     beforeEach(()=> {
//       spyOn(userService, 'getUser').and.returnValue(of(mockUser))
//       // save the mosckPost in the @Input() post
//       fixture.componentInstance.post = mockPost
//       component.ngOnInit()
//       fixture.detectChanges()
//     })

//     it('should render the user name', ()=> {
//       const username = fixture.debugElement.query(By.directive(MatCardSubtitle))
//       expect(username.nativeElement.innerText).toEqual('Test User')
//     })

//     it(`should display the post's title`, ()=> {
//       const postTitle = fixture.debugElement.query(By.directive(MatCardTitle))
//       expect(postTitle.nativeElement.innerText).toEqual('test post')
//     })

//     it(`should display the post's body`, ()=> {
//       const postBody = fixture.debugElement.query(By.directive(MatCardContent))
//       expect(postBody.nativeElement.innerText).toEqual('test body')
//     })

//     // aggiungere i test per il button commenti
//   })
// });
