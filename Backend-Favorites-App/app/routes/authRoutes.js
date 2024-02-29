//user authentication: login, registration, token refresh
import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

export default router;
