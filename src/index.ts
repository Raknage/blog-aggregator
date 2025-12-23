import "process";
import { CommandsRegistry } from "./commands/commands";
import { handlerLogin, handlerRegister, handlerUsers } from "./commands/users";
import { runCommand } from "./commands/commands";
import { handleReset } from "./commands/reset";
import { registerCommand } from "./commands/commands";

async function main() {
  const cmdArgs = process.argv.slice(2);

  if (cmdArgs.length === 0) {
    console.error("Missing command argument");
    process.exit(1);
  }

  const registry: CommandsRegistry = {};
  const [cmdName, ...args] = cmdArgs;
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handleReset);
  registerCommand(registry, "users", handlerUsers);
  await runCommand(registry, cmdName, ...args);

  process.exit(0);
}

main();
