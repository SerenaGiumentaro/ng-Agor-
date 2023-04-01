import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { DialogService } from '../shared/services/dialog.service';
import { PostsComponent } from './posts.component';
import { PostService } from './services/post.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postService: PostService;
  let dialogService: DialogService;
  let dialogNewPost: MatDialog;
  let dialog: MatDialog;
  const allPostsMockResponse = new HttpResponse({
    body: [
      {
        id: 1,
        user_id: 111,
        title: 'test post',
        body: 'test body',
      },
    ],
    headers: new HttpHeaders({ 'x-pagination-total': '10' }),
  });
  const allPostsMockNoResultResponse = new HttpResponse({
    body: [],
    headers: new HttpHeaders({ 'x-pagination-total': '0' }),
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent, NavBarComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    dialogService = TestBed.inject(DialogService);
    dialogNewPost = TestBed.inject(MatDialog);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`should render all posts`, () => {
    const pageIndex = 1;
    const pageSize = 10;
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = pageIndex;
    pageEvent.pageSize = pageSize;

    it(`should render all posts`, () => {
      const getAllPostsSpy = spyOn(component, 'getAllPost');
      component.handlePageEvent(pageEvent);
      expect(component.searchForm).toBeTruthy();
      expect(component.searchForm.value.typeOfSearch).toBe('title');
      expect(getAllPostsSpy).toHaveBeenCalledWith(pageIndex, pageSize);
    });

    it(`should save data from postService`, () => {
      spyOn(postService, 'getAllPosts').and.returnValue(
        of(allPostsMockResponse)
      );
      component.getAllPost(component.pageIndex, component.pageSize);
      expect(component.allPosts).toEqual(allPostsMockResponse.body);
      expect(component.lenghtPosts).toEqual('10');
    });
  });
  it(`should render a dialog error after error response`, () => {
    spyOn(postService, 'getAllPosts').and.returnValue(
      throwError(() => new Error('status: 0, message: "Errore del server"'))
    );
    const dialogSpy = spyOn(dialog, 'open')
    component.getAllPost(component.pageIndex, component.pageSize);
    expect(dialogSpy).toHaveBeenCalled();
  });
  it(`should open new-post dialog after click on button New Post`, () => {
    const newPostBtn = fixture.debugElement.query(
      By.css('.add-post-btn')
    ).nativeElement;
    const dialogNewPostSpy = spyOn(dialogNewPost, 'open')
    newPostBtn.click();
    expect(dialogNewPostSpy).toHaveBeenCalled()
  });

  describe(`Research posts`, () => {
    beforeEach(() => {
      spyOn(dialogService, 'drawDialog');
    });
    it('should make a research clicking on submit button', () => {
      const searchBtn = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement;
      spyOn(postService, 'getAllPostsBySearch').and.returnValue(
        of(allPostsMockResponse)
      );
      searchBtn.click();
      expect(postService.getAllPostsBySearch).toHaveBeenCalled();
    });

    it('should render a no posrt message if there are no result', () => {
      const searchBtn = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement;
      spyOn(postService, 'getAllPostsBySearch').and.returnValue(
        of(allPostsMockNoResultResponse)
      );
      searchBtn.click();
      expect(component.havePost).toBe(false);
    });

    it('should render an error dialog if receive an error server', () => {
      const searchBtn = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement;
      spyOn(postService, 'getAllPostsBySearch').and.returnValue(
        throwError({ status: 0, message: 'Errore del server' })
      );
      searchBtn.click();
      expect(dialog).toBeTruthy();
      expect(dialogService.drawDialog).toHaveBeenCalled();
      expect(dialogService.drawDialog).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore del server`,
        isDenialNeeded: false,
      });
    });
  });
});
