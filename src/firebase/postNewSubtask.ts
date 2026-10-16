import { baseURL } from "./firebaseRequestURL.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";

interface Subtask {
  description: string;
  done: boolean;
  member: string;
}

export async function postNewSubtask(
  data: Record<string, any>,
  correctURLEndPoint: string,
  options: ModalOptions,
): Promise<boolean> {
  const projectID = options.projectID;

  if (!projectID) {
    console.error("Project ID saknas");
    return false;
  }

  try {
    const parentTaskID = correctURLEndPoint.split("/")[0];

    const memberResponse = await fetch(
      `${baseURL}/task/${parentTaskID}/member.json`,
    );

    if (!memberResponse.ok) {
      throw new Error("Kunde inte hämta medlem från parent task");
    }

    const memberID: string | null = await memberResponse.json();

    const subtask: Subtask = {
      description: data.description,
      done: data.done === true || data.done === "true",
      member: memberID ?? "",
    };

    const response = await fetch(`${baseURL}/task/${correctURLEndPoint}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subtask),
    });

    if (!response.ok) {
      throw new Error("Kunde inte skapa subtask");
      return false; 
    }

    const result = await response.json();
    const newSubtaskID: string | undefined = result?.name;

    if (!newSubtaskID) {
      return false;
    }

    const projectResponse = await fetch(
      `${baseURL}/project/${projectID}/subtask/${newSubtaskID}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(""),
      },
    );

    if (!projectResponse.ok) {
      return false;
    }

    catch(error){
      console.log(error); 
      return false; 

    }
  
}
