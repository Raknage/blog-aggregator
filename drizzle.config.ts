import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});
