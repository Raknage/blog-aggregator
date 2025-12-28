import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function insertFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name, url, user_id }).returning();
  return result;
}

export async function getFeeds() {
  const result = await db.select().from(feeds).innerJoin(users, eq(users.id, feeds.user_id));
  return result;
}

export async function markFeedFetched(feedId: string) {
  const [result] = await db.update(feeds).set({ lastFetchedAt: new Date() }).where(eq(feeds.id, feedId)).returning();
  return result;
}

export async function getNextFeedToFetch() {
  const [result] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
    .limit(1);
  return result;
}
