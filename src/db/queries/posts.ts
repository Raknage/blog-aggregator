import { eq, desc } from "drizzle-orm";
import { db } from "..";
import { posts, feeds, feedFollows, PostsInsert } from "../schema";

export async function createPost(post: PostsInsert) {
  const [result] = await db.insert(posts).values(post).onConflictDoNothing({ target: posts.url }).returning();
  return result;
}

export async function getPostsForUser(userId: string, limit: number = 2) {
  const rows = await db
    .select({
      title: posts.title,
      url: posts.url,
      description: posts.description,
      publishedAt: posts.publishedAt,
      feedName: feeds.name,
    })
    .from(posts)
    .innerJoin(feeds, eq(posts.feed_id, feeds.id))
    .innerJoin(feedFollows, eq(feeds.id, feedFollows.feed_id))
    .where(eq(feedFollows.user_id, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);

  return rows;
}
