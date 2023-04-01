import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PostService } from '../../services/post.service';
import { NewPostComponent } from './new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  let postService: PostService;
  let dialog: MatDialog;
  let dialogService: DialogService;
  let dialogRef: MatDialogRef<NewPostComponent>;
  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogref', ['close']);
    await TestBed.configureTestingModule({
      declarations: [NewPostComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: dialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    dialog = TestBed.inject(MatDialog);
    dialogService = TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
  describe(`Creating new post`, () => {
    let postServiceSpy: jasmine.Spy;
    let dialogServicespy: jasmine.Spy;
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValue('111')
      component.newPost.setValue({
        title: 'Mock title',
        body: 'Mock body',
      });
      postServiceSpy = spyOn(postService, 'newPost').and.returnValue(of({}));
      dialogServicespy = spyOn(dialogService, 'drawDialog');
      component.onNewPostSubmit();
    });
    it(`should call postService`, () => {
      expect(postServiceSpy).toHaveBeenCalled();
      expect(postServiceSpy).toHaveBeenCalledWith(
        '111',
        'Mock title',
        'Mock body'
      );
    });

    it('should create a dialog for post creting with succes', () => {
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Il post è stato creato con successo`,
        body: '',
        isDenialNeeded: false,
      });
    });
  });

  describe(`Receiving an error after creating post`, () => {
    let postServiceErrorSpy: jasmine.Spy;
    let dialogServicespy: jasmine.Spy;

    beforeEach(() => {
      postServiceErrorSpy = spyOn(postService, 'newPost');
      dialogServicespy = spyOn(dialogService, 'drawDialog');
    });
    it(`should show a dialog if missing some data, this happen when user is deleted form other`, () => {
      postServiceErrorSpy.and.returnValue(throwError({ status: 422 }));
      component.onNewPostSubmit();
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Dati mancanti`,
        isDenialNeeded: false,
      });
    });

    it(`should show a dialog if there is an error server`, () => {
      postServiceErrorSpy.and.returnValue(throwError({ status: 0 }));
      component.onNewPostSubmit();
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore del server`,
        isDenialNeeded: false,
      });
    });
    it(`should show a dialog if there is an error`, () => {
      postServiceErrorSpy.and.returnValue(throwError({ status: 123 }));
      component.onNewPostSubmit();
      expect(dialog).toBeTruthy();
      expect(dialogServicespy).toHaveBeenCalledWith(dialog, {
        title: `Attenzione!`,
        body: `Errore sconosciuto`,
        isDenialNeeded: false,
      });
    });
  });
});
