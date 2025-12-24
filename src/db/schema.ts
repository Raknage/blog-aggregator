import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text().notNull().unique(),
});

export const feeds = pgTable("feeds", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text().notNull(),
  url: text().notNull().unique(),
  user_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;
