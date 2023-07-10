import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.mjs';
import { uploadFile, deleteFile, getAllFiles } from '../controller/fileController.mjs';
// import { auth } from 'firebase-admin';

const router = express.Router();

// File upload route
router.post('/upload', authenticateUser, uploadFile);

router.delete('/delete/:id', authenticateUser, deleteFile);

router.get('/all', authenticateUser, getAllFiles);

export default router;
