import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertResumeSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_config = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage_config,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    // Accept only pdf files
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically
  app.use('/uploads', (req, res, next) => {
    // Simple API key check for resume downloads (can be enhanced with better auth)
    const apiKey = req.query.key;
    if (req.path.endsWith('.pdf') && apiKey !== 'abhay-portfolio') {
      return res.status(401).send('Unauthorized');
    }
    next();
  }, (req, res, next) => {
    res.setHeader('Content-Type', 'application/pdf');
    next();
  }, (req, res) => {
    const filePath = path.join(uploadDir, path.basename(req.path));
    res.sendFile(filePath);
  });
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.format() 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });
  
  // Resume management endpoints
  
  // Upload new resume
  app.post("/api/resume/upload", upload.single('resume'), async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      
      // Create resume record in storage
      const resumeData = {
        filename: req.file.originalname,
        path: `/uploads/${req.file.filename}`,
      };
      
      const validatedData = insertResumeSchema.parse(resumeData);
      const resume = await storage.createResume(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Resume uploaded successfully!",
        resume
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.format()
        });
      } else {
        console.error("Resume upload error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload resume. Please try again later."
        });
      }
    }
  });
  
  // Get latest resume
  app.get("/api/resume/latest", async (req, res) => {
    try {
      const resume = await storage.getLatestResume();
      
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "No resume found"
        });
      }
      
      res.status(200).json({
        success: true,
        resume
      });
    } catch (error) {
      console.error("Get latest resume error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get resume. Please try again later."
      });
    }
  });
  
  // Get all resumes
  app.get("/api/resume/all", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      
      res.status(200).json({
        success: true,
        resumes
      });
    } catch (error) {
      console.error("Get all resumes error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get resumes. Please try again later."
      });
    }
  });
  
  // Delete resume
  app.delete("/api/resume/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid resume ID"
        });
      }
      
      // Get the resume first to find the file path
      const resume = await storage.getResume(id);
      
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found"
        });
      }
      
      // Delete the resume from storage
      const deleted = await storage.deleteResume(id);
      
      if (!deleted) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete resume"
        });
      }
      
      // Delete the actual file
      const filePath = path.join(process.cwd(), resume.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      res.status(200).json({
        success: true,
        message: "Resume deleted successfully!"
      });
    } catch (error) {
      console.error("Delete resume error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete resume. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
