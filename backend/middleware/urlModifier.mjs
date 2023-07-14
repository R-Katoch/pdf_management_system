// Import the nanoid package
import { customAlphabet } from 'nanoid';

// Create a custom alphabet for the short URLs
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 8); // Generate an 8-character short URL

// In-memory store for the URLs
const urlStore = new Map();

// Function to generate a short URL
const generateShortURL = (url) => {
    const shortURL = nanoid(); // Generate a unique short URL
    urlStore.set(shortURL, url); // Store the URL
    return shortURL;
};

// Function to retrieve the original URL
const getOriginalURL = (shortURL) => {
    return urlStore.get(shortURL);
};

// Export the functions
export { generateShortURL, getOriginalURL };
