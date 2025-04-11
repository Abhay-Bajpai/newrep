// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  resumes;
  messages;
  currentId;
  resumeId;
  messageId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.resumes = /* @__PURE__ */ new Map();
    this.messages = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.resumeId = 1;
    this.messageId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getResume(id) {
    return this.resumes.get(id);
  }
  async getLatestResume() {
    if (this.resumes.size === 0) return void 0;
    const allResumes = Array.from(this.resumes.values());
    allResumes.sort((a, b) => b.id - a.id);
    return allResumes[0];
  }
  async getAllResumes() {
    return Array.from(this.resumes.values());
  }
  async createResume(insertResume) {
    const id = this.resumeId++;
    const now = /* @__PURE__ */ new Date();
    const resume2 = {
      ...insertResume,
      id,
      uploadedAt: now
    };
    this.resumes.set(id, resume2);
    return resume2;
  }
  async deleteResume(id) {
    return this.resumes.delete(id);
  }
  async createMessage(insertMessage) {
    const id = this.messageId++;
    const message = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      message: insertMessage.message,
      subject: insertMessage.subject || null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.messages.set(id, message);
    return message;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default("now()")
});
var resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var insertResumeSchema = createInsertSchema(resume).pick({
  filename: true,
  path: true
});

// server/routes.ts
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
var uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
var storage_config = multer.diskStorage({
  destination: function(_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function(_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage_config,
  limits: { fileSize: 10 * 1024 * 1024 },
  // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
});
async function registerRoutes(app2) {
  app2.use("/uploads", (req, res, next) => {
    const apiKey = req.query.key;
    if (req.path.endsWith(".pdf") && apiKey !== "abhay-portfolio") {
      return res.status(401).send("Unauthorized");
    }
    next();
  }, (req, res, next) => {
    res.setHeader("Content-Type", "application/pdf");
    next();
  }, (req, res) => {
    const filePath = path.join(uploadDir, path.basename(req.path));
    res.sendFile(filePath);
  });
  app2.post("/api/contact", async (req, res) => {
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
  app2.post("/api/resume/upload", upload.single("resume"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      const resumeData = {
        filename: req.file.originalname,
        path: `/uploads/${req.file.filename}`
      };
      const validatedData = insertResumeSchema.parse(resumeData);
      const resume2 = await storage.createResume(validatedData);
      res.status(201).json({
        success: true,
        message: "Resume uploaded successfully!",
        resume: resume2
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
  app2.get("/api/resume/latest", async (req, res) => {
    try {
      const resume2 = await storage.getLatestResume();
      if (!resume2) {
        return res.status(404).json({
          success: false,
          message: "No resume found"
        });
      }
      res.status(200).json({
        success: true,
        resume: resume2
      });
    } catch (error) {
      console.error("Get latest resume error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get resume. Please try again later."
      });
    }
  });
  app2.get("/api/resume/all", async (req, res) => {
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
  app2.delete("/api/resume/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid resume ID"
        });
      }
      const resume2 = await storage.getResume(id);
      if (!resume2) {
        return res.status(404).json({
          success: false,
          message: "Resume not found"
        });
      }
      const deleted = await storage.deleteResume(id);
      if (!deleted) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete resume"
        });
      }
      const filePath = path.join(process.cwd(), resume2.path);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
