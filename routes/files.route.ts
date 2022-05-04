import { Router } from 'express';
import filesController from '../controllers/files/files.controller';

const router = Router();

//http://localhost:3001/api/files
router.post('/upload', filesController.uploadFile);
router.get('/:fileId', filesController.getFileInfo);
router.get('/download/:fileId', filesController.downloadFile)

export default router;
