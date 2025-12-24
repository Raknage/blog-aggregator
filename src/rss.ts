import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: FeedItem[];
  };
};

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export async function fetchFeed(feedURL: string) {
  const headers = new Headers();
  headers.append("User-Agent", "gator");

  const response = await fetch(feedURL, {
    method: "GET",
    headers: headers,
  });

  const data = await response.text();
  return parseXML(data);
}

export function parseXML(data: string): RSSFeed {
  const parser = new XMLParser();
  const XML = parser.parse(data);

  if (!("channel" in XML.rss)) {
    throw new Error("No channel in RSS feed");
  }
  const channel = XML.rss.channel;

  if (!("title" in channel && "link" in channel && "description" in channel)) {
    throw new Error("Channel data missing");
  }
  const metadata = {
    title: channel.title as string,
    link: channel.link as string,
    description: channel.description as string,
  };

  let items = channel.item;
  if (!Array.isArray(items)) {
    items = [];
  }

  const parsedItems: FeedItem[] = [];
  for (const item of items) {
    if ("title" in item && "link" in item && "description" in item && "pubDate" in item) {
      parsedItems.push({ title: item.title, link: item.link, pubDate: item.pubDate, description: item.description });
    }
  }

  return {
    channel: {
      title: metadata.title,
      link: metadata.link,
      description: metadata.description,
      item: parsedItems,
    },
  };
}
