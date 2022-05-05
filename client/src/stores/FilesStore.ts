import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const storageTime: Record<string, string> = {
    '1 день': '86400000',
    '7 дней': '604800000',
    '14 дней': '1209600000',
};

export const fileStorageTimeVariants = Object.keys(storageTime);

export enum UploadStatuses {
    NO_FILE,
    UPLOADING,
    ERROR,
    UPLOADED,
}

type UploadResponse = { error: string; data: never } | { data: { id: string }; error: never };

class FilesStore {
    file: File | null = null;
    storageTime: string = fileStorageTimeVariants[0];
    status: UploadStatuses = UploadStatuses.NO_FILE;
    uploadProgress: number = 0;
    uploadedFileId: string | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setFile(file: File | null) {
        this.file = file;
        this.uploadFile();
    }

    setSotrageTime(storageTime: string) {
        this.storageTime = storageTime;
    }

    setStatus(status: UploadStatuses) {
        if (status === UploadStatuses.NO_FILE) {
            this.resetState();
        }

        this.status = status;
    }

    setUploadProgress(value: number) {
        this.uploadProgress = value;
    }

    setUploadedFileId(id: string | undefined) {
        this.uploadedFileId = id;
    }

    private resetState() {
        this.setFile(null);
        this.setUploadProgress(0);
        this.setUploadedFileId(undefined);
        this.setSotrageTime(fileStorageTimeVariants[0]);
    }

    private getUploadBody() {
        if (this.file === null) return null;

        const body = new FormData();

        body.append('file', this.file);
        body.append('expirationMS', storageTime[this.storageTime]);

        return body;
    }

    private async uploadFile() {
        const body = this.getUploadBody();

        if (body === null) {
            this.setStatus(UploadStatuses.ERROR);
            return;
        }

        this.setStatus(UploadStatuses.UPLOADING);

        try {
            const response = await axios.post<UploadResponse>('/api/files', body, {
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    const integerProgress = Math.trunc(progress);

                    this.setUploadProgress(integerProgress);
                },
            });
            const result = response.data;

            if (result.error) {
                throw new Error(result.error);
            } else {
                this.setUploadedFileId(result.data.id);
                this.setStatus(UploadStatuses.UPLOADED);
            }
        } catch (err) {
            this.setStatus(UploadStatuses.ERROR);
        }
    }
}

export default FilesStore;
