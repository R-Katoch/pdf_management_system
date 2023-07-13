import admin from 'firebase-admin';
import File from '../models/File.mjs';

const uploadFile = async (req, res) => {
    try {
        const user = req.user;
        const uploadedFile = req.file;

        // File validation
        if (!uploadedFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // File processing logic
        const allowedFormats = ['pdf']; // Specify the allowed file formats
        const maxSize = 10 * 1024 * 1024; // Specify the maximum file size in bytes (e.g., 10 MB)

        if (!allowedFormats.includes(uploadedFile.originalname.split('.').pop())) {
            return res.status(400).json({ message: 'Invalid file format' });
        }

        if (uploadedFile.size > maxSize) {
            return res.status(400).json({ message: 'File size exceeds the limit' });
        }

        // Upload the file to Firebase Storage
        const bucket = admin.storage().bucket();
        const filename = `${Date.now()}-${uploadedFile.originalname}`;
        const file = bucket.file(filename);

        await file.save(uploadedFile.buffer, {
            metadata: {
                contentType: uploadedFile.mimetype,
            },
        });

        // Get the public download URL of the uploaded file
        const fileUrl = await file.getSignedUrl({
            action: 'read',
            expires: '01-01-3000', // Set a future expiry date
        });

        // Create a new File document and store the metadata in the database
        const newFile = new File({
            name: uploadedFile.originalname,
            path: fileUrl[0],
            size: uploadedFile.size,
            mimetype: uploadedFile.mimetype,
            user: user._id, // Include the user information
        });
        await newFile.save();

        return res.status(200).json({ file: newFile });
    } catch (error) {
        console.error('Error during file upload:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;

        // Find the file by ID and delete it
        const deletedFile = await File.findByIdAndDelete(fileId);

        if (!deletedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error during file deletion:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const userId = req.user._id; // Retrieve the user ID from the authenticated user

        // Retrieve files associated with the user from the database
        const files = await File.find({ user: userId });

        // Return the files as the response
        return res.status(200).json({ files });
    } catch (error) {
        console.error('Error retrieving files:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getFileById = async (req, res) => {
    try {
        const userId = req.user._id;
        const fileId = req.params.id;

        const file = await File.findById(fileId);
        // file.filter(file => file._doc._id === fileId);

        return res.status(200).json({ file });
    } catch (error) {
        console.error('Error retrieving file:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

export { uploadFile, deleteFile, getAllFiles, getFileById };
