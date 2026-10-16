import { Member } from "./Member.ts";
import { Project } from "./Project.ts";
import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import { Modal } from "../modals/Modal.ts";
import { cleanIndex } from "./cleanIndex.ts"; // prevents duplicates

export async function renderIndex() {
  await cleanIndex();
  const memberObj = await getCategoryDataFirebase("member");
  const projectObj = await getCategoryDataFirebase("project");
  const buttonNewMember = document.getElementById(
    "newMember",
  ) as HTMLButtonElement;
  const buttonNewProject = document.getElementById(
    "newProject",
  ) as HTMLButtonElement;

  const modalNewProject = Modal.getInstance();
  modalNewProject.trigger(buttonNewProject, "post-new-project");

  const modalNewMember = Modal.getInstance();
  modalNewMember.trigger(buttonNewMember, "post-new-member");

  for (const id in projectObj) {
    const newProject = new Project(id, projectObj[id]);
    console.log(projectObj);
    console.log(id);
    newProject.renderAllProjectDataIndex();
  }

  for (const id in memberObj) {
    const newMember = new Member(id, memberObj[id]);
    newMember.renderAllMemberDataIndex();
  }
}
