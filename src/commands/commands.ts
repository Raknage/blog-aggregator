export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
export type CommandsRegistry = Record<string, CommandHandler>;

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
}
export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  await registry[cmdName](cmdName, ...args);
}
export function isDuplicateKeyError(err: any) {
  return err && typeof err === "object" && typeof err.cause === "object" && err.cause.code === "23505";
}
