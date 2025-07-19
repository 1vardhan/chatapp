import express from "express";
import authRoutes from "./routes/auth.route.js"; // Make sure path is correct
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import {connectDB} from "./lib/db.js";
import cors from "cors";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

import {app,server} from "./lib/socket.js";


const PORT =process.env.PORT

const _dirname=path.resolve();




app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
  credentials: true, // This is the crucial part for your error
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Route middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../../frontend1/dist");
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}


// Root route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on PORT:"+PORT);
  connectDB();
});
