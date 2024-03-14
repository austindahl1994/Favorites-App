/**
 * Application logic with middleware, routes, and app logic
 * Tests in isolation, modular, flexible, and scalable
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./app/routes/authRoutes.js";
import postRoutes from "./app/routes/postRoutes.js";
import generalRoutes from "./app/routes/generalRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//ROUTES
app.use(generalRoutes);
app.use(authRoutes);
app.use(postRoutes);

export default app;
