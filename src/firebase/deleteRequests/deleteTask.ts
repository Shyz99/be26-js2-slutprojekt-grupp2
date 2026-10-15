// delete task
// delete task from project
// delete task from member
// patch amount of tasks
import { baseURL } from "../firebaseRequestURL.ts";
import { updateAndCheckTaskCountMembers } from "../../components/render/updateAndCheckTaskCountMembers.ts";

export async function deleteTask(
  taskID: string,
  projectID: string,
): Promise<any> {
  if (!taskID || !projectID) {
    return;
  }

  const deleteOptions = {
    method: "DELETE",
  };

  try {
    const responseDelTask = await fetch(
      `${baseURL}/task/${taskID}.json`,
      deleteOptions,
    );
    if (!responseDelTask.ok) {
      throw "Raderingen fungerade inte";
    }

    const responseDelTaskFromProject = await fetch(
      `${baseURL}/project/${projectID}/tasks/${taskID}.json`,
      deleteOptions,
    );
    if (!responseDelTaskFromProject.ok) {
      throw "Raderingen fungerade inte";
    }

    try{
        const responseDelTask = await fetch(`${baseURL}/task/${taskID}.json`, deleteOptions); 
        if(!responseDelTask.ok){
            throw 'Raderingen fungerade inte'
        }
        

        const responseDelTaskFromProject = await fetch(`${baseURL}/project/${projectID}/tasks/${taskID}.json`, deleteOptions); 
        if(!responseDelTaskFromProject.ok){
            throw 'Raderingen fungerade inte'
        }
        await updateAndCheckTaskCountMembers(); 
        return;
    }
    catch(error){
        throw error; 
    }

}}
