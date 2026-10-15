import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase";
import { baseURL } from "../../firebase/firebaseRequestURL.ts";

export async function updateAndCheckTaskCountMembers(): Promise<void> {
  try {
    const [dataMembers, dataTasks] = await Promise.all([getCategoryDataFirebase("member"), getCategoryDataFirebase("task")]);

    if (!dataMembers || !dataTasks) {
      throw new Error("Kan inte hämta Member eller Task information");
    }

    for (const memberID in dataMembers) {
      let taskCount = 0;
      let subtaskCount = 0;

      for (const taskID in dataTasks) {
        const task = dataTasks[taskID];

        if (task.member === memberID) {
          taskCount++;
        }

        if (task.subtask) {
          for (const subtaskID in task.subtask) {
            if (task.subtask[subtaskID].member === memberID) {
              subtaskCount++;
            }
          }
        }
      }

      const member = dataMembers[memberID];

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tasks: taskCount,
          subtasks: subtaskCount
        })
      }


      if (member.tasks !== taskCount || member.subtasks !== subtaskCount) {
        const response = await fetch(`${baseURL}/member/${memberID}.json`, options);

        if (!response.ok) {
          throw new Error(
            `Kunde inte uppdatera task count för ${memberID}`
          );
        }

        console.log(
          `Updated ${member.name}: ${taskCount} tasks, ${subtaskCount} subtasks`
        );
      } else {
        console.log(
          `Member ${member.name}: No count changes needed`
        );
      }
    }
  } catch (error) {
    console.error("Error updating member task counts:", error);
    throw error;
  }
}