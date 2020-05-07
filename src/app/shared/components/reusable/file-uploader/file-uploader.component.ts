import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../core/services/data.service';
import {filter, pairwise, skip, take} from 'rxjs/operators';
import {BehaviorSubject, Subscription} from 'rxjs';

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
export class FileUploaderComponent implements OnInit, OnDestroy {

  @Input() filesToAccept = '';
  @Input() uploadUrl: string;

  @Output() files: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() uploading: EventEmitter<null> = new EventEmitter<null>();
  @Output() uploaded: EventEmitter<null> = new EventEmitter<null>();

  public readonly FileUploadStatus = FileUploadStatus;

  public filesUploads: Array<FileUpload> = [];

  private uploadTaskCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private subscriptions: Array<Subscription> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.listenToUpload();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

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

    this.startUploading();

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append(file.name, file);
    });

    this.dataService.post(this.uploadUrl, formData)
      .pipe(take(1))
      .subscribe(
        (result: Array<UploadResult>) => this.fileUploadSuccess(result, files),
        error => {
                console.error(error);
                this.fileUploadError(files);
              },
        () => this.endUploading());
  }

  private fileUploadSuccess(result: Array<UploadResult>, allFiles: FileList): void {
    const notUploaded = Array.from(allFiles)
      .filter(file => !result.some(res => res.fileName === file.name));

    result.forEach(res => {
      const fileUpload: FileUpload = this.filesUploads
        .find(_fileUpload => _fileUpload.file.name === res.fileName);

      fileUpload.status = res.error ? FileUploadStatus.ERROR : FileUploadStatus.UPLOADED;
    });

    notUploaded.forEach(file => {
      this.filesUploads
        .find(_fileUpload => _fileUpload.file.name === file.name)
        .status = FileUploadStatus.ERROR;
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

  private listenToUpload(): void {
    const s1 = this.uploadTaskCount$
      .pipe(
        skip(1),
        filter(taskCount => taskCount === 0)
      ).subscribe(() => this.uploaded.emit());

    const s2 = this.uploadTaskCount$
      .pipe(
        pairwise(),
        filter(([oldUploadCount, uploadCountNow]) => oldUploadCount === 0 && uploadCountNow > 0)
      ).subscribe(() => this.uploading.emit());

    this.subscriptions.push(s1);
    this.subscriptions.push(s2);
  }

  private startUploading(): void {
    this.uploadTaskCount$.next(this.uploadTaskCount$.getValue() + 1);
  }

  private endUploading(): void {
    this.uploadTaskCount$.next(this.uploadTaskCount$.getValue() - 1);
  }
}
