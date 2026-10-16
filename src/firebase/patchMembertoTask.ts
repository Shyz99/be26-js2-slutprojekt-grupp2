import { baseURL } from "./firebaseRequestURL.ts";
import { updateAndCheckTaskCountMembers } from "../components/render/updateAndCheckTaskCountMembers.ts";


export async function patchMemberToTask(
  taskID: string,
  memberID: string,
): Promise<boolean> {
  if (!taskID || !memberID) return false;

  try {
    const response = await fetch(`${baseURL}/task/${taskID}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member: memberID }),
    });

    if (!response.ok) {
      console.error("Could not assign member to task", response.status);
      return false;
    }

    await updateAndCheckTaskCountMembers();
    return true;
  } catch (error) {
    console.error("PATCH gick ej", error);
    return false;
  }
}
