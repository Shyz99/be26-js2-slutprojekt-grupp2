import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Project, Member, Task } from "../../models/models.ts";
import { renderTaskCard } from "./renderTaskCards.ts";
import { renderTaskCount } from "./renderTaskCountWithMemberAndProjectID.ts";
import { Modal } from "../modals/Modal.ts";

const projectTitle = document.getElementById(
  "project-title",
) as HTMLHeadingElement;
const projectDescription = document.getElementById(
  "project-description",
) as HTMLParagraphElement;
const projectMembersUl = document.getElementById(
  "project-members-ul",
) as HTMLUListElement;
const taskmodalContainer = document.querySelector(
  ".taskmodal-container",
) as HTMLDivElement;
const newTaskBtn = document.getElementById("new-task-button") as HTMLDivElement;
const addMemberToProjectBtn = document.getElementById(
  "add-member-to-project-button",
) as HTMLDivElement;

//temp:
const tempBtn = document.getElementById("temp-button") as HTMLButtonElement;

tempBtn.addEventListener("click", async () => {
  const chosenProject = await getCategoryDataFirebase("project", "iudshg98dy");
  const projectId = "iudshg98dy";
  renderProjectOverview(chosenProject, projectId);
});

// end temp

//RENDER

async function renderProjectOverview(
  project: Project,
  projectId: string,
): Promise<void> {
  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersUl.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;

  console.log(projectId);

  for (const member in project.members) {
    const projectMember = await getCategoryDataFirebase("member", member);
    renderProjectMembers(projectMember, projectId, member);
  }

  for (const task in project.tasks) {
    const projectTask = await getCategoryDataFirebase("task", task);
    renderTasksList(projectTask, task, projectId);
  }

  //hämta medlemmar till projekt med patch
  const modal = Modal.getInstance();
  modal.trigger(addMemberToProjectBtn, "patch-member-to-project", {
    projectID: projectId,
  });
  //
}

async function renderProjectMembers(
  projectMember: Member,
  projectId: string,
  memberID: string,
): Promise<void> {
  let activeRole: string = "";

  if (projectMember.category.frontend === true) {
    activeRole = "Frontend";
  } else if (projectMember.category.backend === true) {
    activeRole = "Backend";
  } else if (projectMember.category.ux === true) {
    activeRole = "Ux";
  }

  const membersProjectTasks = await renderTaskCount(memberID, projectId);
  console.log(membersProjectTasks);

  const li = document.createElement("li");
  li.textContent = `Name: ${projectMember.name}. Role: ${activeRole}. Number of tasks: ${membersProjectTasks}.`;
  projectMembersUl.append(li);
}

export function renderTasksList(
  task: Task,
  taskID: string,
  projectID: string,
): void {
  //translates the ID
  const translateKey: Record<number, string> = {
    1: "one",
    2: "two",
    3: "three",
  };

  let statusKey = "";
  if (task.status.new) {
    statusKey = "new";
  } else if (task.status.ongoing) {
    statusKey = "ongoing";
  } else if (task.status.done) {
    statusKey = "done";
  }
  //

  //Makes dynamic ID
  const prioWord = translateKey[task.priority];
  const listId = `${statusKey}-tasks-list-prio-${prioWord}`;
  const chosenList = document.getElementById(listId) as HTMLUListElement;
  //

  const li = document.createElement("li");
  li.innerText = task.title;
  chosenList.append(li);

  li.addEventListener("click", () => {
    taskmodalContainer.style.display = "flex";
    renderTaskCard(task, taskID, projectID);
  });

  taskmodalContainer.addEventListener("click", (e) => {
    if (e.target === taskmodalContainer) {
      taskmodalContainer.style.display = "none";
    }
  });
}

newTaskBtn.addEventListener("click", () => {
  //Insert post-function here
});
