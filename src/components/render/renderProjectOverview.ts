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
const ongoingTasksList = document.getElementById(
  "ongoing-tasks-list",
) as HTMLUListElement;
const finishedTasksList = document.getElementById(
  "finished-tasks-list",
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
    renderTasks(projectTask);
  }
}

function renderProjectMembers(projectMember: Member): void {
  let activeRole: string = "";

  if (projectMember.category.frontend === true) {
    activeRole = "Frontend";
  } else if (projectMember.category.backend === true) {
    activeRole = "Backend";
  } else if (projectMember.category.ux === true) {
    activeRole = "Ux";
  }

  const li = document.createElement("li");
  li.textContent = `Namn: ${projectMember.name}. Roll: ${activeRole}. Antal uppgifter: ${projectMember.tasks}.`;
  projectMembersUl.append(li);
}

function renderTasks(task: Task): void {
  const newTasksListOne = document.getElementById(
  "new-tasks-list-prio-one",
  ) as HTMLUListElement;
  const newTasksListTwo = document.getElementById(
  "new-tasks-list-prio-two",
  ) as HTMLUListElement;
  const newTasksListThree = document.getElementById(
  "new-tasks-list-prio-three",
  ) as HTMLUListElement;
  const ongoingTasksListOne = document.getElementById(
  "ongoing-tasks-list-prio-one",
  ) as HTMLUListElement;
  const ongoingTasksListTwo = document.getElementById(
  "ongoing-tasks-list-prio-two",
  ) as HTMLUListElement;
  const ongoingTasksListThree = document.getElementById(
  "ongoing-tasks-list-prio-three",
  ) as HTMLUListElement;
    const doneTasksListOne = document.getElementById(
  "done-tasks-list-prio-one",
  ) as HTMLUListElement;
  const doneTasksListTwo = document.getElementById(
  "done-tasks-list-prio-two",
  ) as HTMLUListElement;
  const doneTasksListThree = document.getElementById(
  "done-tasks-list-prio-three",
  ) as HTMLUListElement;

  const li = document.createElement("li");
  li.innerText = task.title;

  if (task.status.new === true && task.priority === 1) {
    newTasksListOne.append(li);
  } else if (task.status.new === true && task.priority === 2) {
    newTasksListTwo.append(li);
  } else if (task.status.new === true && task.priority === 3) {
    newTasksListThree.append(li);
  } else if (task.status.ongoing === true && task.priority === 1) {
    ongoingTasksListOne.append(li);
  } else if (task.status.ongoing === true && task.priority === 2) {
    ongoingTasksListTwo.append(li);
  } else if (task.status.ongoing === true && task.priority === 3) {
    ongoingTasksListThree.append(li);
  } else if (task.status.done === true && task.priority === 1) {
    doneTasksListOne.append(li);
  } else if (task.status.done === true && task.priority === 2) {
    doneTasksListOne.append(li);
  } else if (task.status.done === true && task.priority === 3) {
    doneTasksListOne.append(li);
  }
  
  
  
  
}
