import express from 'express';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Replace with the actual path to your Firebase service account key JSON file
import multer from 'multer';
import cors from 'cors';
import authRoutes from './routes/authRoutes.mjs';
import fileRoutes from './routes/fileRoutes.mjs';
import commentRoutes from './routes/commentRoutes.mjs';

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

app.use(cors());

// Middleware
app.use(express.json());
app.use(upload.single('file')); // Specify the field name used for file uploads

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://pdf-management-system-18492.appspot.com', // Replace with your Firebase storage bucket URL
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://RohitKatoch21:CwnpfE0MONl9Smem@pdf-management-system.clrphz5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Register the routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

