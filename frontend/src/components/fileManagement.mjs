import React, { useState, useEffect } from 'react';

const FileManagement = () => {
    const [files, setFiles] = useState([]);

    // Fetch the list of files associated with the logged-in user
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch('/api/files/user'); // Replace with your actual backend API endpoint
            const data = await response.json();
            setFiles(data.files);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    return (
        <div>
            <h1>File Management</h1>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FileManagement;
