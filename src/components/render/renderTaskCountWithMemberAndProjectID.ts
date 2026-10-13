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
      console.log("Project matched Member: ", memberProject.name);
    } else {
      console.log("Did not match");
    }
  }
  const data = taskCount;
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
        for (const idTask in allTasks.subtask) {
          if (key == idTask) {
            subTaskCount = subTaskCount + 1;
          }
        }
      }
    }
  }
  const data = subTaskCount;
  return data;
}
