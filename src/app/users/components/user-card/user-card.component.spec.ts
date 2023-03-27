import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/interface';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  const mockUser: User = {
    name: 'Test User',
    email: 'user@test.com',
    id: 111,
    status: 'active',
    gender: 'female',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    component.user = mockUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
