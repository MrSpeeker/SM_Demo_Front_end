import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddDialogComponent } from './add-dialog.component';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddDialogComponent,
        MatDialogModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should drop file 2', () => {
    const mockFile = new File(['test'], 'dummy.txt');
    const dataTransfer = new DataTransfer();

    [mockFile].forEach((file) => {
      dataTransfer.items.add(file);
    });

    const mockEvent: Event = new Event('change');
    if ((<HTMLInputElement>mockEvent.target).files) {
      (<HTMLInputElement>mockEvent.target).files = dataTransfer.files;
    }

    component.fileBrowseHandler(mockEvent);
    expect(component.files).toHaveSize(1);
  });

  it('should format bytes', () => {
    let result = component.formatBytes(0);
    expect(result).toEqual('0 Bytes');

    result = component.formatBytes(1);
    expect(result).toEqual('1 Bytes');

    result = component.formatBytes(1024);
    expect(result).toEqual('1 KB');

    result = component.formatBytes(1048576);
    expect(result).toEqual('1 MB');

    result = component.formatBytes(1073741824);
    expect(result).toEqual('1 GB');
  });
});
