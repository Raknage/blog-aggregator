import "process";
import { CommandsRegistry, handlerLogin, handlerRegister, registerCommand, runCommand } from "./commandHandler";

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
  await runCommand(registry, cmdName, ...args);

  process.exit(0);
}

main();
