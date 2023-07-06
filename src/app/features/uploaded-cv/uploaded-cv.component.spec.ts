import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCvComponent } from './uploaded-cv.component';

describe('UploadedCvComponent', () => {
  let component: UploadedCvComponent;
  let fixture: ComponentFixture<UploadedCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadedCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
