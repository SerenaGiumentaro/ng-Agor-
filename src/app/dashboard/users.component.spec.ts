import { ComponentFixture, TestBed } from '@angular/core/testing';HttpClient
import { UsersComponent } from './users.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersRoutingModule } from './users-routing.module';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let httpClient: HttpClient
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent, UsersComponent ],
      imports:[
        HttpClientTestingModule,
        UsersRoutingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
