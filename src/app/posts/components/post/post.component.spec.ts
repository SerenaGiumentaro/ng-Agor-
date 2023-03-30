import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/posts/services/post.service';
import { UsersService } from 'src/app/users/services/users.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let httpCLient: HttpClient
  let httpTestingController: HttpTestingController
  let dialog: MatDialog
  let userService: UsersService
  let postService: PostService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialog}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    httpCLient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
    userService = TestBed.inject(UsersService)
    postService = TestBed.inject(PostService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
