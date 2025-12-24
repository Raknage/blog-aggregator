import { fetchFeed } from "src/rss";

export async function handleAggregation(_: string) {
  const result = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(result);
}
