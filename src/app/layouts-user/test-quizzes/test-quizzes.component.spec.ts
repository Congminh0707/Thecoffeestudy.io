import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuizzesComponent } from './test-quizzes.component';

describe('TestQuizzesComponent', () => {
  let component: TestQuizzesComponent;
  let fixture: ComponentFixture<TestQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
