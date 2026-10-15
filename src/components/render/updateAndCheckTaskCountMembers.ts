import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase";
import { baseURL } from "../../firebase/firebaseRequestURL.ts";

export async function updateAndCheckTaskCountMembers() {
  let potentialNewTaskInput: number = 2;
  let potentialNewSubTaskInput: number = 1;
  try {
    const dataMembers = await getCategoryDataFirebase("member");
    if (!dataMembers.ok) {
      throw new Error('Kan inte hämta Member information');
    }
    for (const id in dataMembers) {
      potentialNewTaskInput = dataMembers[id].tasks;
      potentialNewSubTaskInput = dataMembers[id].subtasks;

      if (dataMembers[id].tasks !== potentialNewTaskInput) {
        const patchOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            tasks: potentialNewTaskInput
          })
        }
        const response = await fetch(`${baseURL}/member/${dataMembers[id]}/tasks.json`, patchOptions);

        if (!response.ok) {
          throw new Error("Kunde inte patcha task nummer");
        }
      }
      else {
        console.log("member: ", dataMembers[id].name, ": No TASK changes needed");
      }

      if (dataMembers[id].subtasks !== potentialNewSubTaskInput) {
        const patchOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            subtasks: potentialNewSubTaskInput
          })
        }
        const response = await fetch(`${baseURL}/member/${dataMembers[id]}/subtasks.json`, patchOptions);

        if (!response.ok) {
          throw new Error("Kunde inte patcha subtask nummer");
        }

      } else {
        console.log("member: ", dataMembers[id].name, ": No SUB changes needed");
      }
    }
  }
  catch (error) {
    console.log(error);

  }
}



