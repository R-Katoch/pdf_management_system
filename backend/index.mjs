import express from 'express';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
// import serviceAccount from './serviceAccountKey.json' assert {type: "json"}
import multer from 'multer';
import cors from 'cors';
import authRoutes from './routes/authRoutes.mjs';
import fileRoutes from './routes/fileRoutes.mjs';
import commentRoutes from './routes/commentRoutes.mjs';
import { assert } from 'console';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
const app = express();
const PORT = 3000;
const firebaseConnectionUrl = process.env.firebaseConnectionUrl;
const mongodbConnectionUrl = process.env.mongoDbConnectionUrl;

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

const whitelist = ["http://localhost:3000", "https://master--bright-faun-e47d0a.netlify.app/"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))
app.use(cors());

// Middleware
app.use(express.json());
app.use(upload.single('file')); // Specify the field name used for file uploads

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseConnectionUrl, // Replace with your Firebase storage bucket URL
});

// Connect to MongoDB
mongoose.connect(mongodbConnectionUrl, {
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

