import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginService } from 'src/app/login-signup/services/login.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let navigateSpyByUrl: jasmine.Spy;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dialogService: DialogService;
  let loginService: LoginService;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let drawDialogSpy: jasmine.Spy;
  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    drawDialogSpy = spyOn(DialogService.prototype, 'drawDialog');
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
        DialogService,
        LoginService,
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: {afterClosed : () => of(true)} },
        provideRouter([
          {
            path: 'posts',
            loadChildren: () =>
              import('../../posts/posts.module').then((m) => m.PostsModule),
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    navigateSpyByUrl = spyOn(router, 'navigateByUrl');
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    dialogService = TestBed.inject(DialogService);
    loginService = TestBed.inject(LoginService);
    navigateSpy.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should navigate to posts`, () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="posts"')
    );
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['posts']),
      jasmine.anything()
    );
  });

  it(`should navigate to users`, () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="users"')
    );
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['users']),
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
    beforeEach(() => {
      const button = fixture.debugElement.query(By.css('button:last-child'));
      spyOn(component, 'logout');
      button.triggerEventHandler('click', null);
    });
    const mockDialogConfig = {
      title: 'Logout',
      body: `Vuoi uscire dall'appliocazione?`,
      isDenialNeeded: true,
    };
    it(`should call the logout when clicked`, () => {
      expect(component.logout).toHaveBeenCalled();
    });

    it(`should open dialog calling dialog service`, () => {
      dialogService.drawDialog(mockDialog, mockDialogConfig)
      expect(drawDialogSpy).toHaveBeenCalled()
    });

    it(`should call the logout function after press ok`, async()=> {
      const dialogRef: MatDialogRef<DialogComponent> = TestBed.inject(MatDialogRef)
      spyOn(dialogRef, 'afterClosed').and.returnValue(of(true))
      component.logout()
      spyOn(loginService, 'logout')
      await fixture.whenStable()
      expect(loginService.logout).toHaveBeenCalled()
    })
  });
});
