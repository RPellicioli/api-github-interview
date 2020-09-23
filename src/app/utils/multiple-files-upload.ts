import { HttpResponseBase } from "@angular/common/http";
import { FileUploadService } from "../services/file-upload.service";

export class MultipleFilesUpload {
    private readonly maxRetries: number = 5;
    private readonly filePartProportion: number;
    private canceled: boolean;
    private uploading: boolean;
    private currentFileUpload: FileUploadService.Upload;
    private currentFileIndex: number;
    private uploadMetrics: {
        startDate?: Date
        endDate?: Date,
        totalBytes?: number
    };

    private onProgressChangedFn: (args: MultipleFilesUpload.ProgressArgs) => void;
    private onCompletedFn: (args: MultipleFilesUpload.CompletedArgs) => void;
    private onFileCompletedFn: (args: MultipleFilesUpload.FileCompletedArgs) => void;
    private onCanceledFn: (args: MultipleFilesUpload.CancelArgs) => void;
    private onErrorFn: (args: MultipleFilesUpload.ErrorArgs) => void;

    constructor(
        private fileUploadService: FileUploadService,
        private filesCount: number,
        private nextFileRequest: (index: number, retries: number) => Promise<{ file: Blob, url: string }>) {
        this.filePartProportion = 100 / filesCount;
    }

    public onProgressChanged(fn: (args: MultipleFilesUpload.ProgressArgs) => void): MultipleFilesUpload {
        this.onProgressChangedFn = fn;
        return this;
    }

    public onCompleted(fn: (args: MultipleFilesUpload.CompletedArgs) => void): MultipleFilesUpload {
        this.onCompletedFn = fn;
        return this;
    }

    public onFileCompleted(fn: (args: MultipleFilesUpload.FileCompletedArgs) => void): MultipleFilesUpload {
        this.onFileCompletedFn = fn;
        return this;
    }

    public onCanceled(fn: (args: MultipleFilesUpload.CancelArgs) => void): MultipleFilesUpload {
        this.onCanceledFn = fn;
        return this;
    }

    public onError(fn: (args: MultipleFilesUpload.ErrorArgs) => void): MultipleFilesUpload {
        this.onErrorFn = fn;
        return this;
    }

    public startUpload(): void {
        if (this.uploading) {
            return;
        }

        this.uploading = true;
        this.canceled = false;

        this.uploadMetrics = {
            startDate: new Date(),
            totalBytes: 0
        };

        this.currentFileIndex = -1;

        this.uploadNextFile();
    }

    private uploadNextFile(): void {
        if (this.canceled) {
            return;
        }

        this.currentFileIndex++;

        if (this.currentFileIndex < this.filesCount) {
            this.nextRequest();
        } else {
            this.uploading = false;
            this.uploadMetrics.endDate = new Date();
            this.onCompletedFn && this.onCompletedFn({
                uploadMetrics: this.uploadMetrics
            });
        }
    }

    private nextRequest(retries: number = 0): void {
        this.nextFileRequest(this.currentFileIndex, retries).then(args => {
            if (args && args.file && args.url) {
                this.currentFileUpload = this.fileUploadService.upload(
                    args.url,
                    args.file,
                    (response) => {
                        if (this.canceled) {
                            return;
                        }
                        if (response.ok) {
                            this.uploadMetrics.totalBytes += args.file.size;

                            this.onFileCompletedFn && this.onFileCompletedFn({
                                fileIndex: this.currentFileIndex
                            });

                            this.uploadNextFile();
                        } else {
                            this.onErrorFn && this.onErrorFn({
                                response: response
                            });
                        }
                    }, (progress) => {
                        const percentage = (this.filePartProportion * this.currentFileIndex) +
                            (progress.loaded / progress.total * this.filePartProportion);

                        this.onProgressChangedFn && this.onProgressChangedFn({
                            fileIndex: this.currentFileIndex,
                            totalFile: this.filesCount,
                            percentage: percentage
                        });
                    }
                );
            } else {
                this.uploadNextFile();
            }
        });
    }

    private emitCancel(): void {
        this.uploading = false;
        this.onCanceledFn && this.onCanceledFn({});
    }

    public cancel(): void {
        if (!this.canceled) {
            this.canceled = true;
            this.currentFileUpload && this.currentFileUpload.cancel();
            this.emitCancel();
        }
    }
}
export namespace MultipleFilesUpload {
    export class ProgressArgs {
        public fileIndex: number;
        public totalFile: number;
        public percentage: number;
    }

    export class CompletedArgs {
        public uploadMetrics?: {
            startDate?: Date
            endDate?: Date,
            totalBytes?: number
        };
    }

    export class FileCompletedArgs {
        public fileIndex: number;
    }

    export class CancelArgs {

    }

    export class ErrorArgs {
        public response: HttpResponseBase;
    }
}