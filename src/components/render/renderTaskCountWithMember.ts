import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderMemberTaskCount(memberID: string) {
  const memberData: object = await getCategoryDataFirebase("member", memberID);

  const taskCountData: number = Number(
    (memberData as { tasks?: number | string }).tasks ?? "Error: Unknown Tasks",
  );
  const taskCount: number = taskCountData;
  const data = taskCount;
  return data;
}

export async function renderMemberSubTaskCount(memberID: string) {
  const memberData: object = await getCategoryDataFirebase("member", memberID);

  const subTaskCountData: number = Number(
    (memberData as { subtasks?: number | string }).subtasks ??
      "Error: Unknown Subtask",
  );
  const subTaskCount: number = subTaskCountData;

  const data = subTaskCount;
  return data;
}
