import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginService } from 'src/app/login-signup/services/login.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let navigateSpyByUrl: jasmine.Spy;
  let dialogService: DialogService;
  let loginService: LoginService;
  let dialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: [
        provideRouter([
          {
            path: 'posts',
            loadChildren: () =>
              import('../../../posts/posts.module').then((m) => m.PostsModule),
          },
          {
            path: 'users',
            loadChildren: () =>
              import('../../../users/users.module').then((m) => m.UsersModule),
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    navigateSpyByUrl = spyOn(router, 'navigateByUrl');
    dialogService = TestBed.inject(DialogService);
    loginService = TestBed.inject(LoginService);
    dialog = TestBed.inject(MatDialog);
    navigateSpy.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should navigate to posts`, () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="/posts"')
    );
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['/posts']),
      jasmine.anything()
    );
  });

  it(`should navigate to users`, () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="/users"')
    );
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['/users']),
      jasmine.anything()
    );
  });

  it(`should navigate to profile`, () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="profile"')
    );
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['profile']),
      jasmine.anything()
    );
  });
  describe(`Logout`, () => {
    let logoutBtn;
    let dialogRef;
    let logoutServiceSpy: jasmine.Spy;
    beforeEach(() => {
      logoutBtn = fixture.debugElement.query(By.css('.logout'));
      dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRef.afterClosed.and.returnValue(of(true));
      spyOn(dialogService, 'drawDialog').and.returnValue(dialogRef);
      logoutServiceSpy = spyOn(component, 'logout');
      logoutBtn.nativeElement.click();
    });
    const mockDialogConfig = {
      title: 'Logout',
      body: `Vuoi uscire dall'applicazione?`,
      isDenialNeeded: true,
    };
    it(`should call the logout when clicked`, () => {
      expect(component.logout).toHaveBeenCalled();
    });

    it(`should open dialog calling dialog service`, () => {
      dialogService.drawDialog(dialog, mockDialogConfig);
      expect(dialogService.drawDialog).toHaveBeenCalled();
    });

    it(`should call the logout function after press ok`, () => {
      expect(logoutServiceSpy).toHaveBeenCalled();
    });
  });
});
