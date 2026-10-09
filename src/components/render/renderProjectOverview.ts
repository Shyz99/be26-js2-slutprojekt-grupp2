import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Project, Member, Subtask, Task } from "../../models/models.ts";

const projectTitle = document.getElementById(
  "project-title",
) as HTMLHeadingElement;
const projectDescription = document.getElementById(
  "project-description",
) as HTMLParagraphElement;
const projectMembersUl = document.getElementById(
  "project-members-ul",
) as HTMLUListElement;

//temp:
const tempBtn = document.getElementById("temp-button") as HTMLButtonElement;

tempBtn.addEventListener("click", async () => {
  const chosenProject = await getCategoryDataFirebase("project", "iudshg98dy");
  renderProjectOverview(chosenProject);
});

// end temp

//RENDER

async function renderProjectOverview(project: Project): Promise<void> {
  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersUl.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;

  for (const member in project.members) {
    const projectMember = await getCategoryDataFirebase("member", member);
    renderProjectMembers(projectMember);
  }

  for (const task in project.tasks) {
    const projectTask = await getCategoryDataFirebase("task", task);
    renderProjectMembers(projectTask);
  }
}

function renderProjectMembers(projectmember: Member): void {
  let activeRole: string = "";

  for (const role in projectmember.category) {
    if (projectmember.category[role] === true) {
      activeRole = role;
    }
  }

  const li = document.createElement("li");
  li.textContent = `Namn: ${projectmember.name}. Roll: ${activeRole}. Antal uppgifter: ${projectmember.tasks}.`;
  projectMembersUl.append(li);
}

function renderSCRUMBoard(tasks: Task): void {}
