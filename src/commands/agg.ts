import { fetchFeed } from "src/rss";

export async function handleAggregation(_: string) {
  const result = await fetchFeed("https://www.wagslane.dev/index.xml");
  // console.log(result);
  for (const item of result.channel.item) {
    console.log(`${item.title}`);
  }
}
