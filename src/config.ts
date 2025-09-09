import fs from "fs"
import os from "os"
import path from "path"

const cfg = ".gatorconfig.json"
const cfgPath = path.join(os.homedir(), cfg)

type Config = {
    dbUrl: string,
    currentUserName: string
}

export function setUser(user: string) {
    const config = readConfig()
    config.currentUserName = user
    fs.writeFileSync(cfgPath, JSON.stringify(config))
}

export function readConfig(): Config {
    let config = fs.readFileSync(cfgPath, { encoding: "utf-8" })
    return JSON.parse(config)
}