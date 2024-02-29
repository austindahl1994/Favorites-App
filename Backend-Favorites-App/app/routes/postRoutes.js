//Post Routes (postRoutes.js): blogging or messaging feature, routes for creating, fetching, updating, and deleting posts.
import express from 'express';
import { getPosts } from '../controllers/postsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/posts', authenticateToken, getPosts);

export default router;