import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Project, Member, Task } from "../../models/models.ts";
import { renderTaskCard } from "./renderTaskCards.ts";
import { getTasks } from "../../firebase/getTasks.ts";
import { filterTasks } from "../../utils/filterTasks.ts";
import { sortTasks } from "../../utils/sortTasks.ts";

import { renderMemberTaskCountInProject } from "./renderTaskCountWithMemberAndProjectID.ts";
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

//temp: test project
const tempBtn = document.getElementById("temp-button") as HTMLButtonElement;

tempBtn.addEventListener("click", async () => {
  try {
    const chosenProject = await getCategoryDataFirebase(
      "project",
      "iudshg98dy",
    );

    let currentProjectID = "iudshg98dy"; //TEMP, SLÄNG IN PROJECT-ID HÄR
    console.log("Valt projekt:", chosenProject);

    renderProjectOverview(chosenProject, currentProjectID);
  } catch (error) {
    console.error("Kunde inte hämta projekt:", error);
  }
});

// end temp

let currentProject: Project | null = null;
let currentProjectID: string = "";

// Filter values

const statusFilter = document.getElementById(
  "status-filter",
) as HTMLSelectElement;

const memberFilter = document.getElementById(
  "member-filter",
) as HTMLSelectElement;

const categoryFilter = document.getElementById(
  "category-filter",
) as HTMLSelectElement;

const priorityFilter = document.getElementById(
  "priority-filter",
) as HTMLSelectElement;

const subtasksFilter = document.getElementById(
  "subtasks-filter",
) as HTMLSelectElement;

const sortFilter = document.getElementById("sort-filter") as HTMLSelectElement;

//RENDER

async function renderProjectOverview(
  project: Project,
  projectID: string,
): Promise<void> {
  currentProject = project;
  let allTasks: { id: string; task: Task }[] = [];

  document.querySelectorAll(".prio-list").forEach((list) => {
    list.innerHTML = "";
  });

  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersUl.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;

// Add members to filter dropdown
 const allMembers = await getCategoryDataFirebase("member");
 const selectedMember = memberFilter.value;

 memberFilter.innerHTML = '<option value="all">All</option>';
 for (const memberID of Object.keys(allMembers ?? {})) {
  const member = allMembers[memberID];

  const option = document.createElement("option");
  option.value = memberID;
  option.textContent = member.name;

  memberFilter.append(option);
  memberFilter.value = selectedMember;
} 

  for (const memberID of Object.keys(project.members ?? {})) {
    const projectMember = await getCategoryDataFirebase("member", memberID);

    if (projectMember) {
      await renderProjectMembers(projectMember, memberID, projectID);
    }
  }


  //posta ny task
  const modal = Modal.getInstance();
  modal.trigger(newTaskBtn, "add-new-task", {
    projectID: projectID,
  });

  //patch member to project
  const modalTwo = Modal.getInstance();
  modalTwo.trigger(addMemberToProjectBtn, "patch-member-to-project", {
    projectID: projectID,
  });

  // Fetch tasks (filter)
  for (const taskID of Object.keys(project.tasks ?? {})) {
    const projectTask = await getTasks(taskID);
    allTasks.push({ id: taskID, task: projectTask });
  }

  //forts. filter

  const filteredTasks = filterTasks(
    allTasks.map((item) => item.task),

    statusFilter.value as "new" | "ongoing" | "done" | "all",
    memberFilter.value,
    categoryFilter.value as "all" | "backend" | "frontend" | "ux",
    subtasksFilter.value as "all" | "completed" | "remaining",
    priorityFilter.value as "all" | "priority1" | "priority2" | "priority3",
  );

  //Sorting options
  const [sortBy, direction] = sortFilter.value.split("-") as[
    "deadline" | "title",
    "ascending" | "descending",
  ];

  const sortedTasks = sortTasks(filteredTasks, sortBy, direction);

  //forts. filter

  sortedTasks.forEach((task) => {
    const taskWithID = allTasks.findLast((item) => item.task === task);

    if (taskWithID) {
      renderTasksList(task, taskWithID.id, "iudshg98dy");
    }
  });
}

//Listen for filter changes
statusFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject, currentProjectID);
  }
});

memberFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject, currentProjectID);
  }
});

categoryFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject, currentProjectID);
  }
});

priorityFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject, currentProjectID);
  }
});

subtasksFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject, currentProjectID);
  }
});

sortFilter.addEventListener("change", () => {
  if (currentProject) {
    renderProjectOverview(currentProject, currentProjectID);
  }
});

async function renderProjectMembers(
  projectMember: Member,
  memberID: string,
  projectID: string,
): Promise<void> {
  let activeRole: string = "";

  if (projectMember.category.frontend === true) {
    activeRole = "Frontend";
  } else if (projectMember.category.backend === true) {
    activeRole = "Backend";
  } else if (projectMember.category.ux === true) {
    activeRole = "Ux";
  }

  const membersProjectTasks = await renderMemberTaskCountInProject(
    memberID,
    projectID,
  );
  console.log(membersProjectTasks);

  const li = document.createElement("li");
  li.textContent = `Name: ${projectMember.name}. Role: ${activeRole}. Number of tasks: ${projectMember.tasks}.`;
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
}

taskmodalContainer.addEventListener("click", (e) => {
  if (e.target === taskmodalContainer) {
    taskmodalContainer.style.display = "none";
  }
});
