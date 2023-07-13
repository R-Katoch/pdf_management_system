import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.mjs';
import { uploadComment, getAllComments, deleteComment } from '../controller/commentController.mjs';
// import { auth } from 'firebase-admin';

const router = express.Router();

// File upload route
router.post('/comment-upload', authenticateUser, uploadComment);

router.delete('/delete-comment/:id', authenticateUser, deleteComment);

router.get('/all', authenticateUser, getAllComments);

export default router;