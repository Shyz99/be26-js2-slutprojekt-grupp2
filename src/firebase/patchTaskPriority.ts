import { baseURL } from "./firebaseRequestURL.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";

export async function patchTaskPriority(
  data: Record<string, any>,
  URLEndPoint: string,
  options: ModalOptions,
): Promise<boolean> {
  const taskID = options.taskID;

  const patchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priority: data.priority,
    }),
  };

  try {
    const response = await fetch(
      `${baseURL}${URLEndPoint}/${taskID}.json`,
      patchOptions,
    );

    if (!response.ok) {
      throw new Error("Kunde inte uppdatera prioritet");
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
    console.error("PATCH av prioritet fungerade inte", error);
    return false;
  }
}
