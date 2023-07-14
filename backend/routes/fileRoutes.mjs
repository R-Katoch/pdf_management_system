import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.mjs';
import { uploadFile, deleteFile, getAllFiles, getFileById, shareFileById } from '../controller/fileController.mjs';
// import { auth } from 'firebase-admin';

const router = express.Router();

// File upload route
router.post('/upload', authenticateUser, uploadFile);

router.delete('/delete/:id', authenticateUser, deleteFile);

router.get('/all', authenticateUser, getAllFiles);

router.get('/:id', authenticateUser, getFileById);

router.post('/share/:id', authenticateUser, shareFileById);

export default router;
