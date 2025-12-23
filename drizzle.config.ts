import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "src/schema.ts",
  out: "src/db",
  dbCredentials: {
    url: readConfig().dbUrl,
    ssl: { rejectUnauthorized: false },
  },
});
