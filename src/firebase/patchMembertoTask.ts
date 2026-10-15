import type { ModalOptions } from "../components/modals/Modal.ts";
import { baseURL } from "./firebaseRequestURL.ts";

export async function patchMemberToTask(
  taskID: string,
  memberID: string,
): Promise<any> {
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
    const dataTask = await responseTask.json();

    const responseProject = await fetch(
      `${baseURL}/project/tasks/${taskID}.json`,
      patchOptions,
    );
    if (!responseProject.ok) {
      return false;
    }
    const dataProject = await responseProject.json();
    if (dataTask && dataProject) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("PATCH gick ej", error);
    return false;
  }
}
