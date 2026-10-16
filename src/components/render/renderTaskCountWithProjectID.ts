import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderProjectTaskCount(projectID: string) {
  const taskProject: object = await getCategoryDataFirebase(
    "project",
    projectID,
  );

  const taskProjectData: object = (taskProject as { tasks: object }).tasks;

  const allTasks: object = await getCategoryDataFirebase("task");

  let taskCount: number = 0;

  for (const key in taskProjectData) {
    for (const id in allTasks) {
      if (key === id) {
        taskCount = taskCount + 1;
      }
    }
  }

  const data = taskCount;
  return data;
}

export async function renderProjectSubTaskCount(projectID: string) {
  const taskProject: object = await getCategoryDataFirebase(
    "project",
    projectID,
  );

  const taskProjectData: object = (taskProject as { subtask: object }).subtask;

  const allTasks: object = await getCategoryDataFirebase("task");

  let subTaskCount: number = 0;

  for (const key in taskProjectData) {
    for (const id in allTasks) {
      const subTask: object = await getCategoryDataFirebase("task", id);
      const subTaskProjectData: object = (subTask as { subtask: object })
        .subtask;

      for (const subID in subTaskProjectData) {
        if (key === subID) {
          subTaskCount = subTaskCount + 1;
        }
      }
    }
  }
  const data = subTaskCount;
  return data;
}
