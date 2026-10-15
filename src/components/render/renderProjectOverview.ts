import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Project, Member, Task } from "../../models/models.ts";
import {filterTasks} from "../../utils/filterTasks.ts";
import { sortTasks } from "../../utils/sortTasks.ts";
import { renderTaskCard } from "./renderTaskCards.ts";
import { getTasks } from "../../firebase/getTasks.ts";


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
const addMemberToProjectContainer = document.getElementById(
  "add-member-to-project-container",
) as HTMLDivElement;

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

  document.querySelectorAll(".prio-list").forEach((list) => {
    list.innerHTML = "";
  }
);

  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersUl.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;


  for (const member in project.members) {
    const projectMember = await getCategoryDataFirebase("member", member);
    renderProjectMembers(projectMember);
  }

  // Fetch tasks
  for (const task in project.tasks) {
    const projectTask = await getTasks(task);
    console.log("Hämtad uppgift:", projectTask);
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

  sortedTasks.forEach((task) => {
    renderTasksList(task);
  
  });

  const allMembers = await getCategoryDataFirebase("member");
  selectAllMembers(allMembers);
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
  li.textContent = `Name: ${projectMember.name}. Role: ${activeRole}. Number of tasks: ${projectMember.tasks}.`;
  projectMembersUl.append(li);
}

export function renderTasksList(task: Task): void {
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
    renderTaskCard(task, task.title);
  });

  taskmodalContainer.addEventListener("click", (e) => {
    if (e.target === taskmodalContainer) {
      taskmodalContainer.style.display = "none";
    }
  });
}

function selectAllMembers(allMembers: Member[]): void {
  const selectNewMember = document.createElement("select");
  const addMemberToProjectBtn = document.createElement("button");
  addMemberToProjectBtn.innerText = "Add member";

  const membersArray = Object.values(allMembers);

  for (const member of membersArray) {
    const memberName = member.name;
    const memberOption = document.createElement("option");
    memberOption.innerText = memberName;
    selectNewMember.append(memberOption);
  }

  addMemberToProjectBtn.addEventListener("click", () => {
    //Insert patch-function here
  });

  addMemberToProjectContainer.append(selectNewMember, addMemberToProjectBtn);
}

newTaskBtn.addEventListener("click", () => {
  //Insert post-function here
});
