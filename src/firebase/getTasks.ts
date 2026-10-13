import { baseURL } from "./firebaseRequestURL";
//!!!! Ta bort om den ej anv'nds
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

  try {
    const response = await fetch(getURL);
    if (!response.ok) {
      throw new Error("Fetching data from Firebased failed");
    }

    const data = await response.json();
    console.log("All Tasks: ", data);
    console.log("URL: ", getURL);
    return data;
  } catch (error) {
    throw error;
  }
}
