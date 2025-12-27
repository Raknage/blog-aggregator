import { readConfig } from "src/config";
import { createFeedFollow, getFeed, getFeedFollowsForUser } from "src/db/queries/feedFollows";
import { getFeeds, insertFeed } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";
import { Feed, User } from "src/db/schema";

export async function handleFollow(_: string, user: User, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("Argument(s) missing");
  }
  const feed = await getFeed(args[0]);
  const follow = await createFeedFollow(user.id, feed.id);
  console.log(`New feed follow:`);
  printFeed(feed, user);
}

export async function handleGetFollows(_: string, user: User, ...args: string[]) {
  const feeds = await getFeedFollowsForUser(user.id);
  console.log(`${user.name} feeds:`);
  for (const feed of feeds) {
    console.log(`${feed.feeds.name}`);
  }
}

export async function handleAddFeed(_: string, user: User, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("Argument(s) missing");
  }

  const feed = await insertFeed(args[0], args[1], user.id);
  await createFeedFollow(user.id, feed.id);
  console.log(`Feed created:`);
  printFeed(feed, user);
}

export async function handleListFeeds() {
  const feeds = await getFeeds();
  for (const feed of feeds) {
    console.log(`Feed:`);
    printFeed(feed.feeds, feed.users);
  }
}

function printFeed(feed: Feed, user: User) {
  console.log(`  Name:    ${feed.name}`);
  console.log(`  URL:     ${feed.url}`);
  console.log(`  User:    ${user.name}`);
}
