import { makeAutoObservable } from 'mobx';

class FilesStore {
    files: FileList | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setFiles(files: FileList) {
        this.files = files;
    }
}

export default FilesStore;
