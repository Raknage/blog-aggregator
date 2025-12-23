import { resetUsers } from "src/db/queries/users";

export async function handleReset(_: string) {
  const result = await resetUsers();
  console.log(`Users reset:\n${JSON.stringify(result)}`);
}
