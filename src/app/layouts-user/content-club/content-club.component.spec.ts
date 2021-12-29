import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentClubComponent } from './content-club.component';

describe('ContentClubComponent', () => {
  let component: ContentClubComponent;
  let fixture: ComponentFixture<ContentClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
