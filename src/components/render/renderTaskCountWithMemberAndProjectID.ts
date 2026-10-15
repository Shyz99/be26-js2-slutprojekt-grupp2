import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderMemberTaskCountInProject(
  memberID: string,
  projectID: string,
) {
  const taskProject: { tasks: string[] } = await getCategoryDataFirebase(
    "project",
    projectID,
  );

  const allTasks: Record<string, { member: unknown }> =
    await getCategoryDataFirebase("task");

  let taskCount: number = 0;

  //!!! console.log(taskID, " / ", key, " / MEMBER ID DISA", tasksMemberID);
  for (const id in taskProject.tasks) {
    for (const taskID in allTasks) {
      if (taskID == id) {
        const tasksMemberID: string = String(
          (allTasks as Record<string, { member: unknown }>)[taskID].member,
        );
        if (tasksMemberID == memberID) {
          taskCount = taskCount + 1;
        }
      }
    }
  }

  const data = taskCount;
  console.log(
    "Project ID",
    projectID,
    "Member ID:",
    memberID,
    " taskCount",
    taskCount,
  );
  return data;
}

export async function renderMemberSubTaskCountInProject(
  memberID: string,
  projectID: string,
) {
  const subTaskProject: { subtask: Record<string, unknown> } =
    await getCategoryDataFirebase("project", projectID);

  const allTasks: object = await getCategoryDataFirebase("task");
  let subTaskCount: number = 0;

  for (const projectSubTaskID in subTaskProject.subtask) {
    for (const taskID in allTasks) {
      const taskData = (
        allTasks as Record<string, { subtask?: Record<string, unknown> }>
      )[taskID];
      const subtasks = taskData?.subtask ?? {};
      for (const subTaskID in subtasks) {
        const subTaskMemberID = (subtasks[subTaskID] as { member?: unknown })
          .member;
        if (subTaskID == projectSubTaskID) {
          if (subTaskMemberID == memberID) {
            subTaskCount = subTaskCount + 1;
          }
        }
      }
    }
  }
  const data = subTaskCount;
  console.log(
    "Project ID",
    projectID,
    "Member ID:",
    memberID,
    " subTaskCount",
    subTaskCount,
  );
  return data;
}
