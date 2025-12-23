# Blog Aggregator (Gator)

## Project Overview
This is a Command Line Interface (CLI) tool for aggregating blogs, built with TypeScript, Node.js, and PostgreSQL. It uses **Drizzle ORM** for database interactions.

## Prerequisites
-   **Node.js** (Version specified in `.nvmrc` or latest LTS recommended)
-   **PostgreSQL** installed and running.
-   **Configuration File:** A file named `.gatorconfig.json` must exist in your home directory (`~/.gatorconfig.json`).

## Setup & Configuration

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Create Configuration File:**
    Create a file at `~/.gatorconfig.json` with the following structure:
    ```json
    {
      "dbUrl": "postgres://user:password@localhost:5432/blog_aggregator",
      "currentUserName": ""
    }
    ```
    *Replace the `dbUrl` with your actual PostgreSQL connection string.*

## Database Management

The project includes scripts to manage the local PostgreSQL instance and Drizzle migrations:

-   **Start Database Service:** `npm run db-start` (Uses `sudo service postgresql start`)
-   **Stop Database Service:** `npm run db-stop`
-   **Check Status:** `npm run db-status`
-   **Open PSQL Shell:** `npm run psql`
-   **Generate Migrations:** `npm run generate` (Creates SQL files based on schema changes)
-   **Run Migrations:** `npm run migrate` (Applies changes to the database)

## Usage

Run the CLI using `npm start` followed by the command and arguments.

**Syntax:**
```bash
npm start <command> <args>
```

**Available Commands:**

*   **Register a new user:**
    ```bash
    npm start register <username>
    ```
    Creates a new user in the database and sets them as the current user in the config.

*   **Login as an existing user:**
    ```bash
    npm start login <username>
    ```
    Checks if the user exists and updates the current user in the config.

## Project Structure

*   **`src/index.ts`**: Entry point of the application. Parses arguments and delegates to command handlers.
*   **`src/commandHandler.ts`**: Contains the logic for specific CLI commands (`login`, `register`) and the registry system.
*   **`src/config.ts`**: Handles reading and writing the `~/.gatorconfig.json` file.
*   **`src/schema.ts`**: Drizzle ORM schema definitions (e.g., `users` table).
*   **`src/db/`**: Database connection setup and migration files.
    *   **`src/db/queries/`**: Helper functions for database queries.
*   **`drizzle.config.ts`**: Configuration for Drizzle Kit (migrations and introspection).
