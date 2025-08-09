import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  instructor: text("instructor").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  maxParticipants: integer("max_participants"),
});

export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  event: text("event").notNull(),
  score: integer("score").notNull(),
  date: text("date").notNull(),
});

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // videos, pdfs, articles, courses
  category: text("category").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  link: text("link").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export const insertLeaderboardEntrySchema = createInsertSchema(leaderboardEntries).omit({
  id: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;
