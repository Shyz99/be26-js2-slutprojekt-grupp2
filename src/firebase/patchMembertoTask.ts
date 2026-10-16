import { baseURL } from "./firebaseRequestURL.ts";
import { updateAndCheckTaskCountMembers } from "../components/render/updateAndCheckTaskCountMembers.ts";

export async function patchMemberToTask(
  taskID: string,
  memberID: string,
): Promise<boolean> {
  if (!taskID || !memberID) {
    return false;
  }

  const patchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member: memberID,
    }),
  };

  try {
    const responseTask = await fetch(
      `${baseURL}/task/${taskID}.json`,
      patchOptions,
    );
    if (!responseTask.ok) {
      return false;
    }
    await updateAndCheckTaskCountMembers();
    return true;

  } catch (error) {
    console.error("PATCH gick ej", error);
    return false;
  }
}
