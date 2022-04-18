import filesService from '../../services/files/files.service';
import { GetFileParams } from './types';

class FilesController {
    async getFileInfo(req: Server.Request<any, GetFileParams>, res: Server.Response) {
        // validation
        // ...

        const { fileId } = req.params;

        try {
            const fileInfo = await filesService.getFileInfo({ fileId });

            res.status(200).json({ data: fileInfo });
        } catch (err) {
            res.status(500).json({ error: 'File getting error' });
        }
    }
}

export default new FilesController();
