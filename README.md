# Blog Aggregator | gator

A Command Line Interface (CLI) tool for aggregating and browsing RSS feeds. Based on [Boot.dev course](https://www.boot.dev/courses/build-blog-aggregator-typescript).

## Project Overview

This project is a multi-user RSS feed aggregator that runs in the terminal. Users can register, add RSS feeds, follow feeds added by others, and browse the latest posts from their followed feeds. A background worker (`agg`) continuously scrapes followed feeds for new content.

## Technical Architecture

- **Language:** TypeScript / Node.js
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **RSS Parsing:** `fast-xml-parser`
- **CLI Framework:** Custom command registry handling (see `src/commands/commands.ts`)

## Setup & Installation

1.  **Prerequisites:**

    - Node.js (v18+ recommended)
    - PostgreSQL running locally or accessible via URL.

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configuration:**
    Create a configuration file in your home directory: `~/.gatorconfig.json`.

    ```json
    {
      "dbUrl": "postgres://username:password@localhost:5432/blog_aggregator",
      "currentUserName": ""
    }
    ```

    - `dbUrl`: Connection string for your PostgreSQL database.
    - `currentUserName`: Initially empty, updated via `login` command.

4.  **Database Migration:**
    Initialize the database schema:
    ```bash
    npm run migrate
    ```

## Usage

Run the CLI using `npm start`.

### commands

- **User Management:**

  - `register <name>`: Create a new user.
  - `login <name>`: Log in as an existing user.
  - `users`: List all registered users.
  - `reset`: **(Danger)** Deletes all users and feeds from the database.

- **Feed Management:**

  - `addfeed <name> <url>`: Add a new RSS feed to the system.
  - `feeds`: List all available feeds.
  - `follow <url>`: Follow a feed to see its posts.
  - `following`: List feeds you are currently following.
  - `unfollow <url>`: Unfollow a feed.

- **Content:**
  - `browse [limit]`: View recent posts from followed feeds. Default limit is 2.
  - `agg <interval>`: Run the aggregator to fetch new posts. `interval` format: `1s`, `1m`, `1h`. (e.g., `npm start agg 1m`)

## Database Schema

The database consists of the following tables:

- **users**: Stores user accounts (`name`, `createdAt`, `updatedAt`).
- **feeds**: Stores RSS feed definitions (`name`, `url`, `lastFetchedAt`).
- **feed_follows**: Many-to-many relationship between users and feeds.
- **posts**: Individual RSS items (`title`, `url`, `description`, `publishedAt`) linked to a feed.

## Development

- **Entry Point:** `src/index.ts` handles command-line arguments and dispatching.
- **Commands:** New commands are defined in `src/commands/` and registered in `src/index.ts`.
- **Database Queries:** SQL interactions are abstracted in `src/db/queries/`.
- **RSS Logic:** Feed fetching and parsing logic is in `src/rss.ts`.

### Scripts

- `npm start`: Runs the CLI (`tsx src/index.ts`).
- `npm run generate`: Generates SQL migrations based on schema changes.
- `npm run migrate`: Applies pending migrations to the database.
