import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderTaskCount(memberID: string, projectID: string) {
  const taskProject: object = await getCategoryDataFirebase(
    "project",
    projectID,
  );
  const memberProject: object = await getCategoryDataFirebase(
    "member",
    memberID,
  );
  const allTasks: object = await getCategoryDataFirebase("task");

  let taskCount: number = 0;

  for (const id in memberProject.project) {
    if (id == projectID) {
      for (const key in taskProject.tasks) {
        for (const taskID in allTasks) {
          if (key === taskID) {
            taskCount = taskCount + 1;
          }
        }
      }
    }
  }
  const data = taskCount;
  console.log(data);
  return data;
}

export async function renderSubTaskCount(memberID: string, projectID: string) {
  const taskProject: object = await getCategoryDataFirebase(
    "project",
    projectID,
  );
  const memberProject: object = await getCategoryDataFirebase(
    "member",
    memberID,
  );
  const allTasks: object = await getCategoryDataFirebase("task");

  let subTaskCount: number = 0;

  for (const id in memberProject.project) {
    if (id == projectID) {
      for (const key in taskProject.subtask) {
        for (const taskID in allTasks) {
          const temp: object = await getCategoryDataFirebase("task", taskID);
          for (const subID in temp.subtask) {
            if (key === subID) {
              subTaskCount = subTaskCount + 1;
            }
          }
        }
      }
    }
  }
  const data = subTaskCount;
  return data;
}
