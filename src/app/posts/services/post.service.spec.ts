import { HttpParams, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { postsUrl, usersUlr } from 'src/app/api.config';
import { Post } from 'src/app/interface';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  const postsMock: Post[] = [
    {
      id: 123,
      user_id: 123,
      title: 'test title',
      body: 'test body',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`Get user posts`, () => {
    const user_id: number = 123;
    it(`should get all the user posts`, () => {
      service.getUserPosts(user_id).subscribe({
        next: (res) => {
          expect(res).toEqual(postsMock);
        },
      });

      const req: TestRequest = httpMock.expectOne(
        `${usersUlr}/${user_id}/posts`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(postsMock);
    });

    it(`should send an error if http fail`, () => {
      const mockError: string = 'error test';
      service.getUserPosts(user_id).subscribe({
        next: () => fail('error'),
        error: (err) => {
          expect(err.statusText).toEqual('error test');
        },
      });
      const req: TestRequest = httpMock.expectOne(
        `${usersUlr}/${user_id}/posts`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(
        { error: 'error test' },
        { status: 0, statusText: 'error test' }
      );
    });
  });

  describe(`Get all posts`, () => {
    const page: number = 1;
    const perPage: number = 10;
    const allPostResponse: HttpResponse<Post[]> = new HttpResponse({
      body: postsMock,
      status: 200,
      statusText: 'OK',
    });
    it(`should get all the posts`, () => {
      service.getAllPosts(page, perPage).subscribe({
        next: (res: HttpResponse<Post[]>) => {
          expect(res.body![0]).toEqual(allPostResponse.body![0]);
        },
      });
      const req: TestRequest = httpMock.expectOne(
        `${postsUrl}?page=${page}&per_page=${perPage}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(allPostResponse.body);
    });

    it(`should send an error if http fail`, () => {
      service.getAllPosts(page, perPage).subscribe({
        next: () => fail('error'),
        error: (err) => {
          expect(err.status).toEqual(0);
          expect(err.statusText).toEqual('test error');
        },
      });

      const req: TestRequest = httpMock.expectOne(
        `${postsUrl}?page=${page}&per_page=${perPage}`
      );
      req.flush(
        { error: 'test error' },
        { status: 0, statusText: 'test error' }
      );
    });
  });

  describe(`Get all posts after searching`, () => {
    const params: HttpParams = new HttpParams().set('title', 'lorem');
    const page: number = 1;
    const perPage: number = 10;
    const allPostResponse: HttpResponse<Post[]> = new HttpResponse({
      body: postsMock,
      status: 200,
      statusText: 'OK',
    });

    it(`should get all post after a research`, () => {
      service.getAllPostsBySearch(params, page, perPage).subscribe({
        next: (res: HttpResponse<Post[]>) => {
          expect(res.body![0]).toEqual(allPostResponse.body![0]);
        },
      });
      const req: TestRequest = httpMock.expectOne(
        `${postsUrl}?page=${page}&per_page=${perPage}&${params}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(allPostResponse.body);
    });

    it(`should generate an error if http fail`, () => {
      service.getAllPostsBySearch(params, page, perPage).subscribe({
        next: () => fail('error'),
        error: (err) => {
          expect(err.status).toEqual(0);
          expect(err.statusText).toEqual('test error');
        },
      });
      const req: TestRequest = httpMock.expectOne(
        `${postsUrl}?page=${page}&per_page=${perPage}&${params}`
      );
      expect(req.request.method).toEqual('GET');

      req.flush(
        { error: 'test error' },
        { status: 0, statusText: 'test error' }
      );
    });
  });

  describe(`Creating new post`, () => {
    const id: number = 123;
    const title: string = 'test title';
    const body: string = 'test body';

    it(`should create a new post`, () => {
      service.newPost(id, title, body).subscribe({
        next: () => {},
      });

      const req: TestRequest = httpMock.expectOne(`${usersUlr}/${id}/posts`);
      req.flush({});
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ title: title, body: body });
    });

    it(`should send an error if http failed`, () => {
      service.newPost(id, title, body).subscribe({
        next: () => fail('error'),
        error: (err) => {
          expect(err.status).toEqual(0);
          expect(err.statusText).toEqual('test error');
        },
      });

      const req: TestRequest = httpMock.expectOne(`${usersUlr}/${id}/posts`);
      req.flush(
        { error: 'error test' },
        { status: 0, statusText: 'test error' }
      );
    });
  });
});
