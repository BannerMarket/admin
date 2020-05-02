import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../core/services/data.service';
import {take} from 'rxjs/operators';

export enum FileUploadStatus {
  NONE,
  UPLOADING,
  UPLOADED,
  ERROR,
}

export interface FileUpload {
  file: File;
  status: FileUploadStatus;
}

export interface UploadResult {
  fileName: string;
  path: string;
  error?: any;
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() filesToAccept = '';
  @Input() uploadUrl: string;

  @Output() files: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  public readonly FileUploadStatus = FileUploadStatus;

  public filesUploads: Array<FileUpload> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  public uploadFile($event: Event): void {
    const files: FileList = $event.target['files'];
    this.addInProgress(files);
    this.uploadFiles(files);
  }

  private addInProgress(files: FileList): void {
    const toFileUpload = (file: File) => ({file, status: FileUploadStatus.UPLOADING});

    this.filesUploads = this.filesUploads
      .concat(Array.from(files).map(toFileUpload));
  }

  private uploadFiles(files: FileList): void {
    if (!this.uploadUrl) {
      console.error('No upload url supplied!');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append(file.name, file);
    });

    this.dataService.post(this.uploadUrl, formData)
      .pipe(take(1))
      .subscribe(
        (result: Array<UploadResult>) => this.fileUploadSuccess(result),
        error => {
                console.error(error);
                this.fileUploadError(files);
              });
  }

  private fileUploadSuccess(result: Array<UploadResult>): void {
    result.forEach(res => {
      const fileUpload: FileUpload = this.filesUploads
        .find(_fileUpload => _fileUpload.file.name === res.fileName);

      fileUpload.status = res.error ? FileUploadStatus.ERROR : FileUploadStatus.UPLOADED;
    });

    this.files.emit(result
      .filter(res => !res.error)
      .map(res => res.path));
  }

  private fileUploadError(files: FileList): void {
    const fileNames = Array.from(files).map(file => file.name);

    fileNames.forEach(fileName => {
      const fileUpload: FileUpload = this.filesUploads
        .find(_fileUpload => _fileUpload.file.name === fileName);

      fileUpload.status = FileUploadStatus.ERROR;
    });
  }
}
