import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let navigateSpyByUrl: jasmine.Spy
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule, MatToolbarModule, MatIconModule],
      providers: [
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
    router = TestBed.inject(Router)
    navigateSpy = spyOn(router, 'navigate')
    navigateSpyByUrl = spyOn(router, 'navigateByUrl')
    navigateSpy.calls.reset
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
    spyOn(component, 'logout');
    button.triggerEventHandler('click', null);
    expect(component.logout).toHaveBeenCalled();
  });

  it('should clear the local storage after logout', () => {
    spyOn(localStorage, 'clear');
    component.logout();
    expect(localStorage.length).toBe(0);
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should navigate to login component after logout', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
