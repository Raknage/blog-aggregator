import { CommandHandler } from "./commands/commands";
import { getUser } from "./db/queries/users";
import { User } from "./db/schema";
import { readConfig } from "./config";

type UserCommandHandler = (cmdName: string, user: User, ...args: string[]) => Promise<void>;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName, ...args) => {
    const user = await getUser(readConfig().currentUserName);
    if (!user) {
      throw new Error(`User ${user} not found`);
    }
    return handler(cmdName, user, ...args);
  };
}
