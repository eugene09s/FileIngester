import { GetFileData } from './types';

class FilesService {
    async getFileInfo({ fileId }: GetFileData) {
        // get file info from database and return it or throw error
        // ...

        return { fileInfo: fileId };
    }
}

export default new FilesService();
