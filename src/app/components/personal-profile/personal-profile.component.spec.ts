import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfileComponent } from './personal-profile.component';

describe('PersonalProfileComponent', () => {
  let component: PersonalProfileComponent;
  let fixture: ComponentFixture<PersonalProfileComponent>;
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalProfileComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalProfileComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
