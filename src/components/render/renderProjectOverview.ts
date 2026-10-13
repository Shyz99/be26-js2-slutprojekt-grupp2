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

const taskmodalContainer = document.querySelector(
  ".taskmodal-container",
) as HTMLDivElement;
const closeTaskCardBtn = document.getElementById(
  "close-button",
) as HTMLButtonElement;
const saveNewTaskCardChanges = document.getElementById(
  "save-button",
) as HTMLButtonElement;
const taskDoneBtn = document.getElementById(
  "task-done-button",
) as HTMLButtonElement;
const deleteTaskBtn = document.getElementById(
  "delete-task-button",
) as HTMLButtonElement;
const delegateToMember = document.getElementById(
  "delegate-to-member",
) as HTMLSelectElement;
const delegateContainer = document.getElementById(
  "delegate-member-container",
) as HTMLDivElement;
const subtaskContainer = document.getElementById(
  "subtask-container",
) as HTMLDivElement;

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
    renderTasksList(projectTask);
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
  li.textContent = `Name: ${projectMember.name}. Role: ${activeRole}. Number of tasks: ${projectMember.tasks}.`;
  projectMembersUl.append(li);
}

function renderTasksList(task: Task): void {
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
    renderTaskCard(task);
  });

  taskmodalContainer.addEventListener("click", (e) => {
    if (e.target === taskmodalContainer) {
      taskmodalContainer.style.display = "none";
    }
  });
}

async function renderTaskCard(task: Task): Promise<void> {
  const cardTitle = document.getElementById(
    "card-task-title",
  ) as HTMLUListElement;
  const cardInfoContainer = document.getElementById(
    "card-info-container",
  ) as HTMLDivElement;
  const taskModal = document.getElementById("taskmodal") as HTMLDivElement;

  //Rensa
  delegateToMember.innerHTML = "";
  cardTitle.innerHTML = "";
  cardInfoContainer.innerHTML = "";
  taskModal.classList.remove(
    "new-task-modal",
    "ongoing-task-modal",
    "done-task-modal",
  );
  delegateContainer.classList.add("hidden");
  taskDoneBtn.classList.add("hidden");
  deleteTaskBtn.classList.add("hidden");
  subtaskContainer.classList.add("hidden");
  //
  //Lägg till kategori
  let delegatedRole: string = "";

  if (task.category.frontend === true) {
    delegatedRole = "Frontend";
  } else if (task.category.backend === true) {
    delegatedRole = "Backend";
  } else if (task.category.ux === true) {
    delegatedRole = "Ux";
  }
  //
  //Hämta members och kolla deras kategori
  const allMembers = await getCategoryDataFirebase("member");

  let taskMemberName = "";

  for (const key in allMembers) {
    const member: Member = allMembers[key];

    const matchingCategory =
      member.category.backend === task.category.backend &&
      member.category.frontend === task.category.frontend &&
      member.category.ux === task.category.ux;

    if (matchingCategory) {
      const option = document.createElement("option");
      option.value = key;
      option.append(member.name);
      delegateToMember.append(option);
    }

    if (key === task.member) {
      taskMemberName = member.name;
    }
  }

  //

  if (task.status.new === true) {
    taskModal.classList.add("new-task-modal");
    cardTitle.innerHTML = `${task.title}`;
    delegateContainer.classList.remove("hidden");

    cardInfoContainer.innerHTML = `<p>Description: ${task.description}</p><p>Created: ${task.created}</p><p>Category: ${delegatedRole}</p><p>Deadline: ${task.deadline} <button>Change</button></p><p>Priority: ${task.priority} <button>Change</button></p>`;
  } else if (task.status.ongoing === true) {
    taskModal.classList.add("ongoing-task-modal");
    cardTitle.innerHTML = `${task.title}`;
    taskDoneBtn.classList.remove("hidden");
    subtaskContainer.classList.remove("hidden");

    cardInfoContainer.innerHTML = `<p>Description: ${task.description}</p><p>Created: ${task.created}</p><p>Category: ${delegatedRole}</p><p>Deadline: ${task.deadline} <button>Change</button></p><p>Priority: ${task.priority} <button>Change</button></p><p>Delegated member: ${taskMemberName}</p>`;
  } else if (task.status.done === true) {
    taskModal.classList.add("done-task-modal");
    cardTitle.innerHTML = `<h3>Task done!</h3> ${task.title}`;
    deleteTaskBtn.classList.remove("hidden");

    cardInfoContainer.innerHTML = `<p>Description: ${task.description}</p><p>Created: ${task.created}</p><p>Category: ${delegatedRole}</p><p>Deadline: ${task.deadline} <button>Change</button></p><p>Delegated member: ${taskMemberName}</p>`;
  }
}

//Eventlisteners

closeTaskCardBtn.addEventListener("click", () => {
  taskmodalContainer.style.display = "none";
});

saveNewTaskCardChanges.addEventListener("click", () => {
  const selectedMember = delegateToMember.value;
  //Insert patch-function here
});

taskDoneBtn.addEventListener("click", () => {
  //Insert patch-function here
});

deleteTaskBtn.addEventListener("click", () => {
  //Insert delete-function here
});
