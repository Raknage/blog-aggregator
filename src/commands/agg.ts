import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds";
import { fetchFeed } from "src/rss";

export async function handleAggregation(_: string, timeBetweenReqs: string, ...args: string[]) {
  if (!timeBetweenReqs) {
    throw new Error(`Fetch interval missing`);
  }
  const delay = parseDuration(timeBetweenReqs);
  console.log(`Collecting feeds every ${timeBetweenReqs}`);

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, delay);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}

export async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  if (!nextFeed) {
    console.log("No feeds found to fetch. Waiting...");
    return;
  }
  const feed = await markFeedFetched(nextFeed.id);
  const fetchedFeed = await fetchFeed(feed.url);
  console.log(`Fetching feed ${fetchedFeed.channel.title}:`);
  for (const item of fetchedFeed.channel.item) {
    console.log(`  - ${item.title}`);
  }
}

function parseDuration(durationStr: string) {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  if (!match) {
    throw new Error(`Invalid duration string: ${durationStr}`);
  }
  const value = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case "ms":
      return value;
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    default:
      throw new Error(`Invalid unit: ${unit}`);
  }
}

function handleError(err: unknown) {
  throw new Error(`Scraping failed: ${err instanceof Error ? err.message : err}`);
}
