import { readConfig, setUser } from "./config";
import { createUser, getUser, getUsers, resetUsers } from "./db/queries/users";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
export type CommandsRegistry = Record<string, CommandHandler>;

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Argument(s) missing");
  }

  if (!(await getUser(args[0]))) {
    throw new Error(`User "${args[0]}" doesn't exist`);
  }
  setUser(args[0]);
  console.log(`User set to: "${args[0]}"`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Argument(s) missing");
  }

  try {
    const user = await createUser(args[0]);
    setUser(args[0]);
    console.log(`User "${args[0]}" created\n${JSON.stringify(user, null, 2)}`);
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      console.log("User already exists");
    } else {
      console.log(err);
    }
    process.exit(1);
  }
}

export async function handlerUsers(cmdName: string) {
  const listOfUsers = await getUsers();
  const currentUser = readConfig().currentUserName;
  listOfUsers.forEach((e) => {
    console.log(`* ${e.name}${e.name === currentUser ? " (current)" : ""}`);
  });
}

export async function handleReset(cmdName: string) {
  const result = await resetUsers();
  console.log(`Users reset:\n${JSON.stringify(result)}`);
}

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  await registry[cmdName](cmdName, ...args);
}

function isDuplicateKeyError(err: any) {
  return err && typeof err === "object" && typeof err.cause === "object" && err.cause.code === "23505";
}
