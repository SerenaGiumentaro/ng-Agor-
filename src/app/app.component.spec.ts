import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import {
  provideRouter,
  Router,
} from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let app: AppComponent;
  let navigateSpy: jasmine.Spy;
  let navigateSpyByUrl: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, MatIconModule],
      declarations: [AppComponent],
      providers: [
        provideRouter([
          {
            path: 'posts',
            loadChildren: () =>
              import('./posts/posts.module').then((m) => m.PostsModule),
          },
        ]),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    navigateSpy = spyOn(router, 'navigate');
    navigateSpyByUrl = spyOn(router, 'navigateByUrl');
    navigateSpy.calls.reset;
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Agorà'`, () => {
    expect(app.title).toEqual(`Agorà`);
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

  it(`should navigate to dashboard`, () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="dashboard"')
    );
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['dashboard']),
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

  it(`should call logout function when clicked`, () => {
    const button = fixture.debugElement.query(By.css('button:last-child'));
    spyOn(app, 'logout');
    button.triggerEventHandler('click', null);
    // fixture.detectChanges()
    expect(app.logout).toHaveBeenCalled();
  });

  it('should clear the local storage after logout', () => {
    spyOn(localStorage, 'clear');
    app.logout();
    expect(localStorage.length).toBe(0);
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should navigate to login component after logout', () => {
    app.logout();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
