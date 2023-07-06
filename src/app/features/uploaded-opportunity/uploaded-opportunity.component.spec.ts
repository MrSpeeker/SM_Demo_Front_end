import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedOpportunityComponent } from './uploaded-opportunity.component';

describe('UploadedOpportunityComponent', () => {
  let component: UploadedOpportunityComponent;
  let fixture: ComponentFixture<UploadedOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadedOpportunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
