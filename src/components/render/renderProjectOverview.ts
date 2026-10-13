import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Project, Member, Task } from "../../models/models.ts";
import {filterTasks} from "../../utils/filterTasks.ts";
import { sortTasks } from "../../utils/sortTasks.ts";

const projectTitle = document.getElementById(
  "project-title",
) as HTMLHeadingElement;
const projectDescription = document.getElementById(
  "project-description",
) as HTMLParagraphElement;
const projectMembersUl = document.getElementById(
  "project-members-ul",
) as HTMLUListElement;
const newTasksList = document.getElementById(
  "new-tasks-list",
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


// Filter values 

const statusFilter = document.getElementById("status-filter") as HTMLSelectElement;
const memberFilter = document.getElementById("member-filter") as HTMLSelectElement;
const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement;
const subtasksFilter = document.getElementById("subtasks-filter") as HTMLSelectElement;
const sortFilter = document.getElementById("sort-filter") as HTMLSelectElement;

// end filter values

let currentProject: Project | null = null;


//RENDER

async function renderProjectOverview(project: Project): Promise<void> {
  currentProject = project;
  let allTasks: Task[] = [];

  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersUl.innerHTML = "";
  newTasksList.innerHTML = "";
  ongoingTasksList.innerHTML = "";
  finishedTasksList.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;


  for (const member in project.members) {
    const projectMember = await getCategoryDataFirebase("member", member);
    renderProjectMembers(projectMember);
  }

  // Fetch tasks
  for (const task in project.tasks) {
    const projectTask = await getCategoryDataFirebase("task", task);
    allTasks.push(projectTask);
  }

  const filteredTasks = filterTasks(
    allTasks,
    statusFilter.value as "new" | "ongoing" | "done" | "all",
    memberFilter.value,
    categoryFilter.value as "all" | "backend" | "frontend" | "ux",
    subtasksFilter.value as "all" | "hasSubtasks" | "remaining"
  );
  
  const sortParts = sortFilter.value.split("-");
  const sortBy = sortParts[0] as "deadline" | "title";
  const direction = sortParts[1] as "ascending" | "descending";
  
  const sortedTasks = sortTasks(filteredTasks, sortBy, direction);
  console.log("Sorted tasks:", sortedTasks.map((task) => task.title));
  
  // Render sorted tasks
  for (const task of sortedTasks) {
    renderTasks(task);
  }

}


// Listen for filter changes
statusFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject);
  }
});

memberFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject);
  }
});

categoryFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject);
  }
});

subtasksFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject);
  }
});

sortFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject);
  }
});

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
  const li = document.createElement("li");
  li.innerText = task.title;

  if (task.status.new === true) {
    newTasksList.append(li);
  } else if (task.status.ongoing === true) {
    ongoingTasksList.append(li);
  } else if (task.status.done === true) {
    finishedTasksList.append(li);
  }
}
