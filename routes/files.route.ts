import { Router } from 'express';
import filesController from '../controllers/files/files.controller';

const router = Router();

//http://localhost:3001/api/files
router.post('/', filesController.uploadFile);
router.get('/info/:fileId', filesController.getFileInfo);
router.get('/:fileId', filesController.downloadFile)

export default router;
