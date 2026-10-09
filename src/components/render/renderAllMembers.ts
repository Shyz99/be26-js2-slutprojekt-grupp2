import { Member } from "./Member.ts";
import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderAllMembers() {
  const memberObj = await getCategoryDataFirebase("member");

  for (const id in memberObj) {
    const tempMember = new Member(id, memberObj[id]);
    tempMember.render();
  }
}
