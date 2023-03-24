import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { User } from 'src/app/interface';
import { PostService } from 'src/app/posts/services/post.service';
import { UsersService } from 'src/app/dashboard/services/users.service';
import { PersonalProfileComponent } from './personal-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCardComponent } from 'src/app/dashboard/components/user-card/user-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from 'src/app/shared/services/dialog.service';

describe('PersonalProfileComponent', () => {
  let component: PersonalProfileComponent;
  let fixture: ComponentFixture<PersonalProfileComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UsersService;
  let dialogService: DialogService
  let mockDialog: jasmine.SpyObj<MatDialog>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalProfileComponent, UserCardComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule],
      providers: [UsersService, PostService,
      {provide: MatDialog, useValue: mockDialog}],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalProfileComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    dialogService = TestBed.inject(DialogService)
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UsersService);
    fixture.detectChanges();
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
    beforeEach(() => {
      spyOn(userService, 'getUser').and.returnValue(of(mockUser));
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('should receive the user from the id user', () => {
      expect(component.user).toEqual(mockUser);
      expect(component.user.id).toEqual(mockUser.id);
    });
    it('should render the correct gender icon', () => {
      const genderIcon = fixture.debugElement.query(By.css('#icon'));
      expect(genderIcon.nativeElement.innerText).toEqual('face_3');
    });
    it('should render the correct user name', () => {
      const title = fixture.debugElement.query(By.css('h1'));
      expect(title.nativeElement.innerText).toEqual('Test User');
    });
    it('should render the correct user email', () => {
      const title = fixture.debugElement.query(By.css('h3'));
      expect(title.nativeElement.innerText).toEqual('user@test.com');
    });
  });
});
