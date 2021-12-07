import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCourseComponent } from './signup-course.component';

describe('SignupCourseComponent', () => {
  let component: SignupCourseComponent;
  let fixture: ComponentFixture<SignupCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
