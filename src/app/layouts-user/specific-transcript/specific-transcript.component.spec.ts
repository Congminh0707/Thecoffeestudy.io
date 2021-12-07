import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTranscriptComponent } from './specific-transcript.component';

describe('SpecificTranscriptComponent', () => {
  let component: SpecificTranscriptComponent;
  let fixture: ComponentFixture<SpecificTranscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificTranscriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
