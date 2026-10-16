import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderMemberTaskCount(memberID: string) {
  const memberData: object = await getCategoryDataFirebase("member", memberID);

  //! CANT BUID WHEN task IS ASSINGED BUT NOT USED
  const taskCountData: number = Number(
    (memberData as { tasks?: number | string }).tasks ?? "Error: Unknown Tasks",
  );
  const taskCount: number = taskCountData;
  // const taskCount: number = memberData.tasks;
  //!
  const data = taskCount;
  return data;
}

export async function renderMemberSubTaskCount(memberID: string) {
  const memberData: object = await getCategoryDataFirebase("member", memberID);

  //! CANT BUID WHEN task IS ASSINGED BUT NOT USED
  const subTaskCountData: number = Number(
    (memberData as { subtasks?: number | string }).subtasks ??
      "Error: Unknown Subtask",
  );
  const subTaskCount: number = subTaskCountData;
  // const subtaskCount: number = memberData.subtasks;
  //!

  const data = subTaskCount;
  return data;
}
