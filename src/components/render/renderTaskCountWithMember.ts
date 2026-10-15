import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderMemberTaskCount(memberID: string) {
  const memberData: object = await getCategoryDataFirebase("member", memberID);
  const taskCount: number = memberData.tasks;

  const data = taskCount;
  return data;
}

export async function renderMemberSubTaskCount(memberID: string) {
  const memberData: object = await getCategoryDataFirebase("member", memberID);
  const taskCount: number = memberData.subtasks;

  const data = taskCount;
  return data;
}
