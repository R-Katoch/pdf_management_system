// Import necessary dependencies
import express from 'express';
import { signupController, loginController, logoutController } from '../controller/authController.mjs';

// Create a router instance
const router = express.Router();

// Define the user signup route
router.post('/signup', signupController);

// Define the user login route
router.post('/login', loginController);

// Define the logout route
router.post('/logout', logoutController);

// Export the router
export default router;
