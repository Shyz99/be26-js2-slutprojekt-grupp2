import { Member } from "./Member.ts";
import { Project } from "./Project.ts";
import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

export async function renderIndex() {
  const memberObj = await getCategoryDataFirebase("member");
  const projectObj = await getCategoryDataFirebase("project");

  for (const id in projectObj) {
    const newProject = new Project(id, projectObj[id]);
    newProject.renderAllProjectDataIndex();
  }

  for (const id in memberObj) {
    const newMember = new Member(id, memberObj[id]);
    newMember.renderAllMemberDataIndex();
  }
}
