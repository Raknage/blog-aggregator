import fs from "fs";
import os from "os";
import path from "path";

const cfgFile = ".gatorconfig.json";
const cfgPath = path.join(os.homedir(), cfgFile);

type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(user: string) {
  const config = readConfig();
  config.currentUserName = user;
  fs.writeFileSync(cfgPath, JSON.stringify(config));
}

export function readConfig(): Config {
  let config = fs.readFileSync(cfgPath, { encoding: "utf-8" });
  return validateConfig(JSON.parse(config));
}

function validateConfig(rawConfig: any): Config {
  const cfg: Config = rawConfig;
  if (typeof cfg.dbUrl !== "string" || typeof cfg.currentUserName !== "string") {
    throw new Error("Config validation failed");
  }
  return cfg;
}
