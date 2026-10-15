import { baseURL } from "../firebaseRequestURL.ts";
import { updateAndCheckTaskCountMembers } from "../../components/render/updateAndCheckTaskCountMembers.ts";

export async function deleteSubtask(subtaskID: string, taskID: string, projectID: string,): Promise<void> {
  if (!taskID || !projectID || !subtaskID) {
    throw new Error("taskID, projectID och subtaskID måste skickas med.");
  }

  const deleteOptions = {
    method: "DELETE",
  };

  try {
    
    const responseDelSubtask = await fetch(
      `${baseURL}/task/${taskID}/${subtaskID}.json`,
      deleteOptions,
    );

    if (!responseDelSubtask.ok) {
      throw new Error("kan inte radera subtask från task.");
    }

    
    const responseDelSubtaskFromProject = await fetch(
      `${baseURL}/project/${projectID}/subtask/${subtaskID}.json`,
      deleteOptions,
    );

    if (!responseDelSubtaskFromProject.ok) {
      throw new Error("kan inte radera subtask från projekt.");
    }


    await updateAndCheckTaskCountMembers();
    
  } catch (error) {
    throw error;
  }
}
