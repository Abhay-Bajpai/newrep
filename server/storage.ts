import { users, type User, type InsertUser, type Resume, type InsertResume, type Message, type InsertMessage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Resume operations
  getResume(id: number): Promise<Resume | undefined>;
  getLatestResume(): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  deleteResume(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private messages: Map<number, Message>;
  currentId: number;
  resumeId: number;
  messageId: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.messages = new Map();
    this.currentId = 1;
    this.resumeId = 1;
    this.messageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getResume(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getLatestResume(): Promise<Resume | undefined> {
    if (this.resumes.size === 0) return undefined;
    
    // Get all resumes and sort by id in descending order
    const allResumes = Array.from(this.resumes.values());
    allResumes.sort((a, b) => b.id - a.id);
    
    // Return the first one (latest)
    return allResumes[0];
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.resumeId++;
    const now = new Date();
    
    const resume: Resume = { 
      ...insertResume, 
      id,
      uploadedAt: now
    };
    
    this.resumes.set(id, resume);
    return resume;
  }

  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    
    // Create the message object with proper types
    const message: Message = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      message: insertMessage.message,
      subject: insertMessage.subject || null,
      createdAt: new Date().toISOString(),
    };
    
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
