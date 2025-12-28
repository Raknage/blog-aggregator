import { getPostsForUser } from "../db/queries/posts";
import { User } from "../db/schema";

export async function handleBrowse(_: string, user: User, limitStr?: string) {
  let limit = 2;
  if (limitStr) {
    limit = parseInt(limitStr);
    if (!limit) {
      throw new Error(`Invalid limit: ${limitStr}`);
    }
  }

  const posts = await getPostsForUser(user.id, limit);
  console.log(`Found ${posts.length} posts for user ${user.name}:`);
  for (const post of posts) {
    console.log(`${post.publishedAt?.toISOString()} - ${post.title}`);
    console.log(`    ${post.url}`);
    console.log(`    ${post.description}`);
    console.log(`    From feed: ${post.feedName}`);
    console.log("---");
  }
}
