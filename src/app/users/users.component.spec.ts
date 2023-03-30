import { ComponentFixture, TestBed } from '@angular/core/testing';HttpClient
import { UsersComponent } from './users.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersRoutingModule } from './users-routing.module';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent, NavBarComponent, UsersListComponent],
      imports:[
        HttpClientTestingModule,
        UsersRoutingModule,
        MatDialogModule,
        MatToolbarModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
