import { 
  type User, type InsertUser, 
  type Event, type InsertEvent, 
  type Project, type InsertProject,
  type Publication, type InsertPublication,
  type Blog, type InsertBlog,
  type LeaderboardEntry, type InsertLeaderboardEntry, 
  type Resource, type InsertResource 
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(username: string, password: string): Promise<User | null>;
  
  // Event operations
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Publication operations
  getAllPublications(): Promise<Publication[]>;
  getPublication(id: string): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: string, publication: Partial<InsertPublication>): Promise<Publication | undefined>;
  deletePublication(id: string): Promise<boolean>;
  
  // Blog operations
  getAllBlogs(): Promise<Blog[]>;
  getBlog(id: string): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: string): Promise<boolean>;
  
  // Leaderboard operations
  getAllLeaderboardEntries(): Promise<LeaderboardEntry[]>;
  createLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
  
  // Resource operations
  getAllResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private events: Map<string, Event>;
  private projects: Map<string, Project>;
  private publications: Map<string, Publication>;
  private blogs: Map<string, Blog>;
  private leaderboardEntries: Map<string, LeaderboardEntry>;
  private resources: Map<string, Resource>;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.projects = new Map();
    this.publications = new Map();
    this.blogs = new Map();
    this.leaderboardEntries = new Map();
    this.resources = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
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
        maxParticipants: 50,
        createdAt: new Date()
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
        maxParticipants: 100,
        createdAt: new Date()
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
        maxParticipants: 200,
        createdAt: new Date()
      }
    ];

    // Sample Projects
    const sampleProjects: Project[] = [
      {
        id: "1",
        title: "Smart Campus IoT System",
        description: "IoT-based campus management system with real-time monitoring and analytics",
        fullDescription: "A comprehensive IoT system designed for smart campus management featuring real-time sensor monitoring, automated alerts, energy management, and predictive analytics for optimal resource utilization.",
        category: "IoT",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: JSON.stringify(["Python", "Raspberry Pi", "MongoDB", "React", "Node.js"]),
        githubUrl: "https://github.com/cyberhub/smart-campus",
        demoUrl: "https://smart-campus-demo.vercel.app",
        author: "Alex Chen",
        status: "Active",
        createdAt: new Date()
      },
      {
        id: "2",
        title: "AI-Powered Study Assistant",
        description: "Machine learning application that helps students optimize their study schedules",
        fullDescription: "An intelligent study assistant using machine learning algorithms to analyze learning patterns, recommend optimal study schedules, and provide personalized content recommendations based on individual learning styles.",
        category: "AI/ML",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: JSON.stringify(["Python", "TensorFlow", "Flask", "Vue.js", "PostgreSQL"]),
        githubUrl: "https://github.com/cyberhub/study-assistant",
        demoUrl: "https://study-assistant-ai.herokuapp.com",
        author: "Sarah Rodriguez",
        status: "In Progress",
        createdAt: new Date()
      },
      {
        id: "3",
        title: "Blockchain Voting Platform",
        description: "Secure, transparent voting system built on blockchain technology",
        fullDescription: "A decentralized voting platform leveraging blockchain technology to ensure vote integrity, transparency, and security. Features include voter authentication, real-time vote tracking, and immutable vote records.",
        category: "Blockchain",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: JSON.stringify(["Solidity", "Web3.js", "React", "Node.js", "IPFS"]),
        githubUrl: "https://github.com/cyberhub/blockchain-voting",
        demoUrl: "https://secure-vote.netlify.app",
        author: "Michael Thompson",
        status: "Completed",
        createdAt: new Date()
      },
      {
        id: "4",
        title: "Green Energy Monitor",
        description: "Real-time monitoring dashboard for renewable energy systems",
        fullDescription: "A comprehensive monitoring solution for renewable energy systems featuring real-time data visualization, performance analytics, predictive maintenance alerts, and energy optimization recommendations.",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: JSON.stringify(["React", "D3.js", "Node.js", "InfluxDB", "Docker"]),
        githubUrl: "https://github.com/cyberhub/green-energy-monitor",
        demoUrl: "https://green-monitor.cyberhub.dev",
        author: "Emily Zhang",
        status: "Active",
        createdAt: new Date()
      }
    ];

    // Sample Publications
    const samplePublications: Publication[] = [
      {
        id: "1",
        title: "Machine Learning in Cybersecurity: A Comprehensive Review",
        description: "An in-depth analysis of ML applications in cybersecurity, covering threat detection, anomaly detection, and predictive security measures.",
        content: "This comprehensive review examines the current state and future prospects of machine learning applications in cybersecurity...",
        author: "Dr. Sarah Chen",
        category: "Research Paper",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        publishedDate: "2024-11-15",
        tags: JSON.stringify(["Machine Learning", "Cybersecurity", "AI", "Threat Detection"]),
        pdfUrl: "https://cyberhub.edu/papers/ml-cybersecurity-review.pdf",
        createdAt: new Date()
      },
      {
        id: "2",
        title: "Sustainable Computing: Green Algorithms for Energy Efficiency",
        description: "Research on developing energy-efficient algorithms and their impact on sustainable computing practices.",
        content: "The growing concern for environmental sustainability has prompted researchers to focus on green computing...",
        author: "Prof. Michael Thompson",
        category: "Research Paper",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        publishedDate: "2024-10-22",
        tags: JSON.stringify(["Green Computing", "Energy Efficiency", "Algorithms", "Sustainability"]),
        pdfUrl: "https://cyberhub.edu/papers/sustainable-computing.pdf",
        createdAt: new Date()
      }
    ];

    // Sample Blogs
    const sampleBlogs: Blog[] = [
      {
        id: "1",
        title: "Getting Started with React Hooks: A Beginner's Guide",
        description: "Learn the fundamentals of React Hooks and how they can simplify your component logic",
        content: "React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore useState, useEffect, and custom hooks...",
        author: "Alex Chen",
        category: "Tutorial",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        publishedDate: "2024-12-01",
        tags: JSON.stringify(["React", "JavaScript", "Frontend", "Tutorial"]),
        readTime: "8 min read",
        isPublished: true,
        createdAt: new Date()
      },
      {
        id: "2",
        title: "The Future of AI in Education",
        description: "Exploring how artificial intelligence is transforming educational experiences",
        content: "Artificial Intelligence is reshaping the educational landscape in unprecedented ways...",
        author: "Dr. Sarah Chen",
        category: "Opinion",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        publishedDate: "2024-11-28",
        tags: JSON.stringify(["AI", "Education", "Technology", "Future"]),
        readTime: "12 min read",
        isPublished: true,
        createdAt: new Date()
      },
      {
        id: "3",
        title: "Cybersecurity Best Practices for Developers",
        description: "Essential security practices every developer should implement in their projects",
        content: "Security should be a fundamental consideration in every development project...",
        author: "Michael Thompson",
        category: "Tutorial",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        publishedDate: "2024-11-25",
        tags: JSON.stringify(["Cybersecurity", "Development", "Best Practices", "Security"]),
        readTime: "15 min read",
        isPublished: true,
        createdAt: new Date()
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
        link: "#",
        createdAt: new Date()
      }
    ];

    // Populate maps
    sampleEvents.forEach(event => this.events.set(event.id, event));
    sampleProjects.forEach(project => this.projects.set(project.id, project));
    samplePublications.forEach(publication => this.publications.set(publication.id, publication));
    sampleBlogs.forEach(blog => this.blogs.set(blog.id, blog));
    sampleLeaderboard.forEach(entry => this.leaderboardEntries.set(entry.id, entry));
    sampleResources.forEach(resource => this.resources.set(resource.id, resource));

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser: User = {
      id: "admin",
      username: "admin",
      email: "admin@cyberhub.com",
      password: adminPassword,
      isAdmin: true,
      createdAt: new Date()
    };
    this.users.set("admin", adminUser);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user: User = {
      id: randomUUID(),
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(eventData: InsertEvent): Promise<Event> {
    const event: Event = {
      id: randomUUID(),
      ...eventData,
      createdAt: new Date(),
    };
    this.events.set(event.id, event);
    return event;
  }

  async updateEvent(id: string, eventData: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;

    const updatedEvent: Event = {
      ...existingEvent,
      ...eventData,
    };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const project: Project = {
      id: randomUUID(),
      ...projectData,
      createdAt: new Date(),
    };
    this.projects.set(project.id, project);
    return project;
  }

  async updateProject(id: string, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;

    const updatedProject: Project = {
      ...existingProject,
      ...projectData,
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Publication methods
  async getAllPublications(): Promise<Publication[]> {
    return Array.from(this.publications.values());
  }

  async getPublication(id: string): Promise<Publication | undefined> {
    return this.publications.get(id);
  }

  async createPublication(publicationData: InsertPublication): Promise<Publication> {
    const publication: Publication = {
      id: randomUUID(),
      ...publicationData,
      createdAt: new Date(),
    };
    this.publications.set(publication.id, publication);
    return publication;
  }

  async updatePublication(id: string, publicationData: Partial<InsertPublication>): Promise<Publication | undefined> {
    const existingPublication = this.publications.get(id);
    if (!existingPublication) return undefined;

    const updatedPublication: Publication = {
      ...existingPublication,
      ...publicationData,
    };
    this.publications.set(id, updatedPublication);
    return updatedPublication;
  }

  async deletePublication(id: string): Promise<boolean> {
    return this.publications.delete(id);
  }

  // Blog methods
  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async getBlog(id: string): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async createBlog(blogData: InsertBlog): Promise<Blog> {
    const blog: Blog = {
      id: randomUUID(),
      ...blogData,
      createdAt: new Date(),
    };
    this.blogs.set(blog.id, blog);
    return blog;
  }

  async updateBlog(id: string, blogData: Partial<InsertBlog>): Promise<Blog | undefined> {
    const existingBlog = this.blogs.get(id);
    if (!existingBlog) return undefined;

    const updatedBlog: Blog = {
      ...existingBlog,
      ...blogData,
    };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    return this.blogs.delete(id);
  }

  // Leaderboard methods
  async getAllLeaderboardEntries(): Promise<LeaderboardEntry[]> {
    return Array.from(this.leaderboardEntries.values()).sort((a, b) => b.score - a.score);
  }

  async createLeaderboardEntry(entryData: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const entry: LeaderboardEntry = {
      id: randomUUID(),
      ...entryData,
    };
    this.leaderboardEntries.set(entry.id, entry);
    return entry;
  }

  // Resource methods
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.type === type);
  }

  async createResource(resourceData: InsertResource): Promise<Resource> {
    const resource: Resource = {
      id: randomUUID(),
      ...resourceData,
      createdAt: new Date(),
    };
    this.resources.set(resource.id, resource);
    return resource;
  }
}

export const storage = new MemStorage();
