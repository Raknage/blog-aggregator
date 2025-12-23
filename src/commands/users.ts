import { setUser, readConfig } from "src/config";
import { getUser, createUser, getUsers } from "src/db/queries/users";
import { isDuplicateKeyError } from "./commands";

export async function handlerLogin(_: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Argument(s) missing");
  }

  if (!(await getUser(args[0]))) {
    throw new Error(`User "${args[0]}" doesn't exist`);
  }
  setUser(args[0]);
  console.log(`User set to: "${args[0]}"`);
}

export async function handlerRegister(_: string, ...args: string[]) {
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

export async function handlerUsers(_: string) {
  const listOfUsers = await getUsers();
  const currentUser = readConfig().currentUserName;
  listOfUsers.forEach((e) => {
    console.log(`* ${e.name}${e.name === currentUser ? " (current)" : ""}`);
  });
}
