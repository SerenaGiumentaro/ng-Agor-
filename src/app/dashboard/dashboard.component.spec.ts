import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardRoutingModule } from './dashboard-routing.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpClient: HttpClient
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, UsersComponent ],
      imports:[
        HttpClientTestingModule,
        DashboardRoutingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
