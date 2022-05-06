import { GetFileParams } from './types';
import fileUpload from 'express-fileupload';

import fileService from '../../services/files/files.service';
import { v4 as uuidv4 } from 'uuid';

let stream = require('stream');

class FilesController {
    async getFileInfo(req: Server.Request<any, GetFileParams>, res: Server.Response) {
        const { fileId } = req.params;

        try {
            let fileInfo = await fileService.getFileInfo({ fileId });
            if (fileInfo) {
                if (fileInfo.deleteDate <= new Date()) {
                    res.status(410).json({ error: 'File is expired' });
                    fileService.deleteFile(fileId);
                    console.log('File with id' + fileId + ' is deleted due to expiration during getting him');
                    return;
                }
                res.status(200).json({ data: fileInfo });
            } else {
                res.status(404).json({ error: 'File not found' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error during getting file info' });
        }
    }

    async uploadFile(req: Server.Request, res: Server.Response) {
        try {
            if (!req.files) {
                res.status(400).json({ error: 'No file uploaded' });
                return;
            }
            let expirationMS = req.body.expirationMS;

            //Use the name of the input field to retrieve the uploaded file
            let uploadedFile: fileUpload.UploadedFile = req.files.file as fileUpload.UploadedFile;

            //upload file
            let id: string = uuidv4();
            await fileService.uploadFile(uploadedFile, id, expirationMS);

            //return id
            res.status(201).json({ data: { id: id } });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async downloadFile(req: Server.Request<any, GetFileParams>, res: Server.Response) {
        const fileId = req.params.fileId;

        try {
            let fileInfo = await fileService.getFileInfo({ fileId });
            if (!fileInfo) {
                res.status(404).json({ error: 'File not found' });
                return;
            }
            if (fileInfo.deleteDate <= new Date()) {
                res.status(410).json({ error: 'File is expired' });
                fileService.deleteFile(fileId);
                console.log('File with id' + fileId + ' is deleted due to expiration during getting him');
                return;
            }
            let fileContent = await fileService.downloadFile(fileId);
            if (!fileContent) {
                res.status(500).json({ error: 'File not found on server' });
                return;
            }
            fileService.incrementDownloads(fileId);

            const readStream = new stream.PassThrough();
            readStream.end(fileContent);

            // @ts-ignore
            res.set('Content-disposition', 'attachment; filename=' + fileInfo.name);
            // @ts-ignore
            res.set('Content-Type', fileInfo.mimeType);

            readStream.pipe(res);
        } catch (err) {
            res.status(500).json({ error: 'File getting error' });
        }
    }
}

export default new FilesController();
