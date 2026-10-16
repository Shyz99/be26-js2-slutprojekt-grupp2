import { baseURL } from "./firebaseRequestURL.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";

export async function patchTaskDeadline(
  data: Record<string, any>,
  URLEndPoint: string,
  options: ModalOptions,
): Promise<boolean> {
  const taskID = options.taskID;
  const newDeadline = data.deadline;

  if (!taskID) {
    return false;
  }

  const patchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deadline: newDeadline,
    }),
  };

  try {
    const response = await fetch(
      `${baseURL}${URLEndPoint}/${taskID}.json`,
      patchOptions,
    );

    if (!response.ok) {
      throw new Error("Kan inte uppdatera deadline");
    }

    const data = await response.json();
    if (data) {
      const event = new CustomEvent("taskUpdated", { detail: { taskID } });
      window.dispatchEvent(event);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("PATCH av deadline misslyckades", error);
    return false;
  }
}
