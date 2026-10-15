import { baseURL } from "./firebaseRequestURL";
import { showToast } from "../components/errors/toast.ts";

export async function getTasks(
  taskId?: string,
  allSubtasks?: boolean,
  subtaskID?: string,
) {
  let subtaskTrue: string = "";

  if (taskId !== undefined) {
    taskId = "/" + taskId;
    if (allSubtasks == true) {
      subtaskTrue = "/subtask";
      if (subtaskID !== undefined) {
        subtaskID = "/" + subtaskID;
      } else {
        subtaskID = "";
      }
    } else {
      subtaskTrue = "";
      subtaskID = "";
    }
  } else {
    taskId = "";
    subtaskTrue = "";
    subtaskID = "";
  }

  const getURL: string = `${baseURL}/task${taskId}${subtaskTrue}${subtaskID}.json`;
  console.log("getTasks körs:", getURL);

  try {
    const response = await fetch(getURL);
    if (!response.ok) {
      throw new Error("Fetching data from Firebased failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast("Kunde inte hämta uppgifter. Försök igen.");
    throw error;
  }
}
