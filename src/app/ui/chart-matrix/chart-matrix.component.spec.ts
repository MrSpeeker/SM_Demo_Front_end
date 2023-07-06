import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMatrixComponent } from './chart-matrix.component';

describe('ChartMatrixComponent', () => {
  let component: ChartMatrixComponent;
  let fixture: ComponentFixture<ChartMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ChartMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
