# Overview

CyberHub is a modern web application designed as a tech community platform that connects passionate technology enthusiasts, innovators, and future leaders. The application serves as a hub for tech events, educational resources, community leaderboards, and administrative functions. Built with a full-stack architecture, it provides an engaging interface for users to discover workshops, hackathons, networking events, and learning materials while fostering community interaction through competitive elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture:

- **UI Framework**: Utilizes **shadcn/ui** components built on top of **Radix UI** primitives for consistent, accessible design
- **Styling**: **Tailwind CSS** with custom CSS variables for theming, featuring a "cyber" design theme with blue accents
- **Routing**: **Wouter** for lightweight client-side routing
- **State Management**: **TanStack Query (React Query)** for server state management and caching
- **Build Tool**: **Vite** for fast development and optimized production builds
- **Component Organization**: Modular structure with separate directories for UI components, pages, hooks, and utilities

## Backend Architecture
The backend follows a **RESTful API** design pattern:

- **Runtime**: **Node.js** with **Express.js** framework
- **Language**: **TypeScript** throughout the entire stack
- **API Design**: RESTful endpoints for events, leaderboard entries, resources, and users
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Hot reload and middleware logging for development experience

## Data Storage Solutions
The application uses a **PostgreSQL** database with **Drizzle ORM**:

- **Database**: PostgreSQL (configured for Neon Database hosting)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Schema-first approach with automatic TypeScript type generation
- **Migrations**: Database migrations managed through Drizzle Kit
- **Data Models**: Users, Events, Leaderboard Entries, and Resources with proper relationships
- **Validation**: Zod schemas for runtime data validation integrated with Drizzle

## Development Environment
The project is structured as a monorepo with shared types and schemas:

- **Shared Schema**: Common TypeScript types and Zod validation schemas used across frontend and backend
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)
- **Development Setup**: Integrated development environment with automatic reloading
- **Production Build**: Separate build processes for client and server with ESBuild optimization

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL hosting service for production database
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Styling Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs

## Development and Build Tools
- **Vite**: Build tool and development server
- **ESBuild**: JavaScript bundler for production builds
- **TypeScript**: Static type checking for entire codebase
- **PostCSS**: CSS processing with Tailwind CSS integration

## Form and Data Management
- **React Hook Form**: Form handling with @hookform/resolvers for validation
- **TanStack Query**: Server state management, caching, and synchronization
- **date-fns**: Date utility library for date formatting and manipulation

## Development-Specific Integrations
- **Replit Integration**: Configured for Replit development environment with specific plugins and error handling
- **Runtime Error Overlay**: Development-time error visualization
- **Cartographer Plugin**: Replit-specific development tooling