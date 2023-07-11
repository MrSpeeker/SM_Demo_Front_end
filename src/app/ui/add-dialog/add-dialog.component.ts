import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FileData } from '../../model/file-data';
import { IOperationType } from '../../model/operation-type';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  public files: File[] = [];
  public filesData: FileData[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      label: string;
      object_id: string;
      operation_type: IOperationType;
    }
  ) {}

  /**
   * handle file from browsing
   */
  public fileBrowseHandler(event: Event) {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    if (files) {
      const filesArray: File[] = Array.from(files);
      this.prepareFilesList(filesArray);
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  public deleteFile(index: number) {
    this.files.splice(index, 1);
    this.filesData.splice(index, 1);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  public formatBytes(bytes: number | undefined) {
    if (bytes) {
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i];
    } else {
      return '0 Bytes';
    }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  private prepareFilesList(files: File[]) {
    this.files = files;
    for (const item of files) {
      this.convertFile(item);
    }
  }

  private convertFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.filesData.push({
        file_name: file.name,
        file_text: fileReader.result as string,
      });
    };
    fileReader.readAsText(file);
  }
}
