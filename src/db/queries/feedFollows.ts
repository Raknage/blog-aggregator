import { eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";

export async function createFeedFollow(user_id: string, feed_id: string) {
  const [newFollow] = await db.insert(feedFollows).values({ user_id, feed_id }).returning();
  const [result] = await db
    .select()
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feed_id, feeds.id))
    .innerJoin(users, eq(feedFollows.user_id, users.id))
    .where(eq(feedFollows.id, newFollow.id));
  return result;
}

export async function getFeed(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db
    .select()
    .from(feeds)
    .innerJoin(feedFollows, eq(feedFollows.feed_id, feeds.id))
    .innerJoin(users, eq(users.id, feedFollows.user_id))
    .where(eq(feedFollows.user_id, userId));
  return result;
}
