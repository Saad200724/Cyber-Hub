import { type User, type InsertUser, type Event, type InsertEvent, type LeaderboardEntry, type InsertLeaderboardEntry, type Resource, type InsertResource } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
  
  getAllLeaderboardEntries(): Promise<LeaderboardEntry[]>;
  createLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
  
  getAllResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private events: Map<string, Event>;
  private leaderboardEntries: Map<string, LeaderboardEntry>;
  private resources: Map<string, Resource>;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.leaderboardEntries = new Map();
    this.resources = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample Events
    const sampleEvents: Event[] = [
      {
        id: "1",
        title: "AI & Machine Learning Workshop",
        description: "Dive deep into artificial intelligence and machine learning fundamentals with hands-on projects.",
        fullDescription: "Join us for an intensive 6-hour workshop covering the fundamentals of AI and ML. You'll learn about neural networks, data preprocessing, and build your first ML model.",
        date: "2024-12-28",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        instructor: "Dr. Sarah Chen",
        duration: "6 hours",
        level: "Beginner to Intermediate",
        maxParticipants: 50
      },
      {
        id: "2",
        title: "CyberHack 2025",
        description: "48-hour hackathon focused on sustainable technology solutions. Win amazing prizes!",
        fullDescription: "Our biggest hackathon of the year! Teams of 2-4 will compete to build innovative solutions for environmental challenges. Prizes worth $10,000+",
        date: "2025-01-15",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        instructor: "CyberHub Team",
        duration: "48 hours",
        level: "All Levels",
        maxParticipants: 100
      },
      {
        id: "3",
        title: "Tech Industry Meetup",
        description: "Connect with industry professionals, share experiences, and explore career opportunities.",
        fullDescription: "Network with 200+ tech professionals from top companies. Includes panel discussions, workshops, and networking sessions.",
        date: "2025-02-05",
        category: "Networking",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        instructor: "Industry Experts",
        duration: "4 hours",
        level: "All Levels",
        maxParticipants: 200
      }
    ];

    // Sample Leaderboard Entries
    const sampleLeaderboard: LeaderboardEntry[] = [
      { id: "1", name: "Alex Chen", event: "CyberHack 2024", score: 2847, date: "2024-11-15" },
      { id: "2", name: "Sarah Rodriguez", event: "AI Workshop Series", score: 2756, date: "2024-11-20" },
      { id: "3", name: "Michael Thompson", event: "Security Challenge", score: 2698, date: "2024-11-18" },
      { id: "4", name: "Emily Zhang", event: "Web Dev Bootcamp", score: 2634, date: "2024-11-22" },
      { id: "5", name: "David Kim", event: "Mobile App Contest", score: 2587, date: "2024-11-10" }
    ];

    // Sample Resources
    const sampleResources: Resource[] = [
      {
        id: "1",
        title: "JavaScript Fundamentals",
        type: "videos",
        category: "Programming",
        description: "Master the basics of JavaScript with this comprehensive video series.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: "4 hours",
        level: "Beginner",
        link: "https://youtube.com/watch?v=example"
      },
      {
        id: "2",
        title: "React Best Practices Guide",
        type: "pdfs",
        category: "Frontend",
        description: "Comprehensive PDF guide covering React patterns and best practices.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: "45 pages",
        level: "Intermediate",
        link: "#"
      },
      {
        id: "3",
        title: "Building Scalable APIs",
        type: "articles",
        category: "Backend",
        description: "Learn how to design and build APIs that can handle millions of requests.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        duration: "15 min read",
        level: "Advanced",
        link: "#"
      }
    ];

    // Populate maps
    sampleEvents.forEach(event => this.events.set(event.id, event));
    sampleLeaderboard.forEach(entry => this.leaderboardEntries.set(entry.id, entry));
    sampleResources.forEach(resource => this.resources.set(resource.id, resource));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent, 
      id,
      maxParticipants: insertEvent.maxParticipants ?? null
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;
    
    const updatedEvent = { ...existingEvent, ...updateData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  async getAllLeaderboardEntries(): Promise<LeaderboardEntry[]> {
    return Array.from(this.leaderboardEntries.values()).sort((a, b) => b.score - a.score);
  }

  async createLeaderboardEntry(insertEntry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const id = randomUUID();
    const entry: LeaderboardEntry = { ...insertEntry, id };
    this.leaderboardEntries.set(id, entry);
    return entry;
  }

  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.type === type);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }
}

export const storage = new MemStorage();
