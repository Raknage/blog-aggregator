import "process";
import { CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./commandHandler";

function main() {
  const cmdArgs = process.argv.slice(2);

  if (cmdArgs.length === 0) {
    console.error("Missing command argument");
    process.exit(1);
  } else if (cmdArgs.length < 2) {
    console.error("Username argument missing");
    process.exit(1);
  }

  const registry: CommandsRegistry = {};
  const [cmdName, ...args] = cmdArgs;
  registerCommand(registry, "login", handlerLogin);
  runCommand(registry, cmdName, ...args);
}

main();
