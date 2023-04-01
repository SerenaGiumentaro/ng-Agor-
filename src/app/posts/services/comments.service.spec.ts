import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { postsUrl } from 'src/app/api.config';
import { Comment } from 'src/app/interface';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let mockcomment: Comment[];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentsService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get post comment', () => {
    const post_id = 123;
    afterEach(() => {
      httpMock.verify();
    });

    it(`should return a comment`, () => {
      mockcomment = [
        {
          id: 123,
          post_id: 123,
          name: 'test name',
          email: 'test@email',
          body: 'test comment',
        },
      ];

      service.getPostComments(post_id).subscribe((res) => {
        expect(res).toEqual(mockcomment);
      });

      const req = httpMock.expectOne(`${postsUrl}/${post_id}/comments`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockcomment);
    });

    it('should return an error if http request fail', () => {
      const errMessageMock = 'error test';
      service.getPostComments(post_id).subscribe({
        next: () => fail('error'),
        error: (err) => {
          expect(err.statusText).toEqual(errMessageMock);
          expect(err.status).toEqual(0);
        },
      });

      const req = httpMock.expectOne(`${postsUrl}/${post_id}/comments`);
      expect(req.request.method).toEqual('GET');
      req.flush(
        { error: 'error test' },
        { status: 0, statusText: 'error test' }
      );
    });
  });

  describe(`Posting new comment`, () => {
    const post_id = 123;
    const userName = 'test user';
    const userEmail = 'test@test';
    const comment = 'test comment';
    mockcomment = [
      {
        id: 123,
        post_id: post_id,
        name: userName,
        email: userEmail,
        body: comment,
      },
    ];
    afterEach(() => {
      httpMock.verify();
    });

    it(`should post a new comment`, () => {
      service.postNewComment(post_id, userEmail, userName, comment).subscribe({
        next: (res) => {
          expect(res).toEqual(mockcomment[0]);
        },
      });

      const req = httpMock.expectOne(`${postsUrl}/${post_id}/comments`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockcomment[0]);
    });

    it(`should generate an error if receive an error response`, () => {
      const errMessageMock = 'error test';
      service.postNewComment(post_id, userEmail, userName, comment).subscribe({
        next: () => fail('error'),
        error: (err) => {
          expect(err.statusText).toEqual(errMessageMock);
          expect(err.status).toEqual(0);
        },
      });

      const req = httpMock.expectOne(`${postsUrl}/${post_id}/comments`);
      expect(req.request.method).toEqual('POST');
      req.flush(
        { error: 'error test' },
        { status: 0, statusText: 'error test' }
      );
    });
  });
});
