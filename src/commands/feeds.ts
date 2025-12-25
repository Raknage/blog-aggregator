import { readConfig } from "src/config";
import { getFeeds, insertFeed } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";
import { Feed, User } from "src/db/schema";

export async function handleAddFeed(_: string, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("Argument(s) missing");
  }

  const user = await getUser(readConfig().currentUserName);
  const feed = await insertFeed(args[0], args[1], user.id);
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
