import FilesStore from './FilesStore';

class RootStore {
    filesStore: FilesStore;

    constructor() {
        this.filesStore = new FilesStore();
    }
}

export default RootStore;
