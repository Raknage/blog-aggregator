import { pgTable, primaryKey, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text().notNull(),
  url: text().notNull().unique(),
  user_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastFetchedAt: timestamp("last_fetched_at"),
});

export const feedFollows = pgTable(
  "feed_follows",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    user_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    feed_id: uuid()
      .notNull()
      .references(() => feeds.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.feed_id, table.user_id)]
);

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;
export type feedFollows = typeof users.$inferSelect;
