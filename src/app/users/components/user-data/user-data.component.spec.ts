import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDataComponent } from './user-data.component';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;
  let dialog: MatDialog
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialog}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
