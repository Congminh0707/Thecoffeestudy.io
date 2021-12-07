import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultStudyComponent } from './default-study.component';

describe('DefaultStudyComponent', () => {
  let component: DefaultStudyComponent;
  let fixture: ComponentFixture<DefaultStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
