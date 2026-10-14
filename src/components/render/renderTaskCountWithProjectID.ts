import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderProjectTaskCount(projectID: string) {
  const taskProject: object = await getCategoryDataFirebase(
    "project",
    projectID,
  );
  const allTasks: object = await getCategoryDataFirebase("task");

  let taskCount: number = 0;

  for (const key in taskProject.tasks) {
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
  const allTasks: object = await getCategoryDataFirebase("task");

  let subTaskCount: number = 0;

  for (const key in taskProject.subtask) {
    for (const id in allTasks) {
      const temp: object = await getCategoryDataFirebase("task", id);
      for (const subID in temp.subtask) {
        if (key === subID) {
          subTaskCount = subTaskCount + 1;
        }
      }
    }
  }
  const data = subTaskCount;
  return data;
}
