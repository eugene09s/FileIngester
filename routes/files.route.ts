import { Router } from 'express';
import filesController from '../controllers/files/files.controller';

const router = Router();

// check http://localhost:3001/api/files/any_id
router.get('/:fileId', filesController.getFileInfo);

export default router;
