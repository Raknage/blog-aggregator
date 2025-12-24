import { readConfig } from "src/config";
import { insertFeed } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";
import { Feed, User } from "src/db/schema";

export async function handleAddFeed(_: string, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("Argument(s) missing");
  }

  const user = await getUser(readConfig().currentUserName);
  const feed = await insertFeed(args[0], args[1], user.id);
  printFeed(feed, user);
}
function printFeed(feed: Feed, user: User) {
  console.log(`Feed created:`);
  console.log(`  Name:    ${feed.name}`);
  console.log(`  URL:     ${feed.url}`);
  console.log(`  User:    ${user.name}`);
}
