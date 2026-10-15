import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Member, Subtask, Task } from "../../models/models.ts";
import { Modal } from "../modals/Modal.ts";
import { deleteTask } from "../../firebase/deleteRequests/deleteTask.ts";
import { patchMemberToTask } from "../../firebase/patchMembertoTask.ts";
import { deleteSubtask } from "../../firebase/deleteRequests/deleteSubtasks.ts";

const closeTaskCardBtn = document.getElementById(
  "close-button",
) as HTMLButtonElement;
const saveNewTaskCardChanges = document.getElementById(
  "save-task-changes-button",
) as HTMLButtonElement;
const taskDoneBtn = document.getElementById(
  "task-done-button",
) as HTMLButtonElement;
const deleteTaskBtn = document.getElementById(
  "delete-task-button",
) as HTMLButtonElement;
const addSubtaskBtn = document.getElementById(
  "add-subtask-button",
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
const newSubtaskContainer = document.getElementById(
  "new-subtask-container",
) as HTMLDivElement;
const taskmodalContainer = document.querySelector(
  ".taskmodal-container",
) as HTMLDivElement;
const saveMemberToTaskBtn = document.getElementById(
  "save-member-to-task-button",
) as HTMLButtonElement;

export async function renderTaskCard(
  task: Task,
  taskID: string,
  projectID: string,
): Promise<void> {
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
  newSubtaskContainer.classList.add("hidden");

  //Lägg till kategori
  let delegatedRole: string = "";

  if (task.category.frontend === true) {
    delegatedRole = "Frontend";
  } else if (task.category.backend === true) {
    delegatedRole = "Backend";
  } else if (task.category.ux === true) {
    delegatedRole = "Ux";
  }

  //Hämta members och kolla deras kategori
  const allMembers = await getCategoryDataFirebase("member");

  let taskMemberName = "";

  //posta new subtask
  const modal = Modal.getInstance();
  modal.trigger(addSubtaskBtn, "add-new-subtask", {
    taskID: taskID,
    projectID: projectID,
  });

  //jämnför task.category med member.category
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

    //Patch member to task
    const chosenMember = delegateToMember.value;

    saveMemberToTaskBtn.addEventListener("click", () => {
      patchMemberToTask(taskID, chosenMember);
      console.log(taskID, chosenMember);
    });
  }

  //Pach task-status
  const modalOne = Modal.getInstance();
  modalOne.trigger(taskDoneBtn, "patch-task-status", {
    taskID: taskID,
  });

  //Patch task-status
  const modalTwo = Modal.getInstance();
  modalTwo.trigger(saveNewTaskCardChanges, "patch-task-status", {
    taskID: taskID,
  });

  //Knapp deadline - patch
  const changeDeadline = document.createElement("button");
  changeDeadline.innerText = "Change deadline";
  const modalThree = Modal.getInstance();
  modalThree.trigger(changeDeadline, "patch-task-deadline", {
    taskID: taskID,
  });

  //Knapp priorty - patch
  const changePriority = document.createElement("button");
  changePriority.innerText = "Change Priority";
  const modalFour = Modal.getInstance();
  modalFour.trigger(changePriority, "patch-task-priority", {
    taskID: taskID,
  });

  //Hämta delete-task-funktion
  deleteTaskBtn.addEventListener("click", () => {
    deleteTask(taskID, projectID);
  });

  //Rendera innuti modalerna beroende på status
  if (task.status.new === true) {
    taskModal.classList.add("new-task-modal");
    cardTitle.innerHTML = `${task.title}`;
    delegateContainer.classList.remove("hidden");

    cardInfoContainer.innerHTML = `
    <p>Description: ${task.description}</p>
    <p>Created: ${task.created}</p>
    <p>Category: ${delegatedRole}</p>
    <p>Deadline: ${task.deadline}<div id= "btn-deadline-container"></div></p>
    <p>Priority: ${task.priority}<div id= "btn-priority-container"></div></p>`;
  } else if (task.status.ongoing === true) {
    taskModal.classList.add("ongoing-task-modal");
    cardTitle.innerHTML = `${task.title}`;
    taskDoneBtn.classList.remove("hidden");
    subtaskContainer.classList.remove("hidden");
    newSubtaskContainer.classList.remove("hidden");

    cardInfoContainer.innerHTML = `
    <p>Description: ${task.description}</p>
    <p>Created: ${task.created}</p>
    <p>Category: ${delegatedRole}</p>
    <p>Deadline: ${task.deadline}<div id= "btn-deadline-container"></div></p>
    <p>Priority: ${task.priority}<div id= "btn-priority-container"></div></p>
    <p>Delegated member: ${taskMemberName}</p>`;
  } else if (task.status.done === true) {
    taskModal.classList.add("done-task-modal");
    cardTitle.innerHTML = `<h3>Task done!</h3> ${task.title}`;
    deleteTaskBtn.classList.remove("hidden");

    cardInfoContainer.innerHTML = `
    <p>Description: ${task.description}</p>
    <p>Created: ${task.created}</p>
    <p>Category: ${delegatedRole}</p>
    <p>Deadline: ${task.deadline}<div id= "btn-deadline-container"></div></p>
    <p>Delegated member: ${taskMemberName}</p>`;
  }

  const deadlineBtnContainer = document.getElementById(
    "btn-deadline-container",
  );
  const priorityBtnContainer = document.getElementById(
    "btn-priority-container",
  );

  //skapa container för knappar
  deadlineBtnContainer?.append(changeDeadline);
  priorityBtnContainer?.append(changePriority);

  //skicka vidare rätt info
  if (task.subtask) {
    const subtaskArray = Object.values(task.subtask);
    renderSubtasks(subtaskArray, taskID, projectID);
  }
}

function renderSubtasks(
  subtasks: Subtask[],
  taskID: string,
  projectID: string,
): void {
  subtaskContainer.innerHTML = "";
  console.log(subtasks);

  const subtaskArray = Object.entries(subtasks);
  //skickar med subtaskID och subtask till en array

  function updateCheckboxState() {
    const allDone = subtaskArray.every(([_, subtask]) => {
      return subtask.done === true;
    });
    if (allDone || subtaskArray.length < 0) {
      taskDoneBtn.classList.remove("disable-button");
    } else {
      taskDoneBtn.classList.add("disable-button");
    }
  }

  for (const [subtaskID, subtask] of subtaskArray) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const deleteSubtaskBtn = document.createElement("button");
    deleteSubtaskBtn.innerText = "Delete";
    const subtaskTitle = document.createElement("span");
    subtaskTitle.innerHTML = `${subtask.description}`;

    if (subtask.done === true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    checkbox.addEventListener("change", () => {
      subtask.done = checkbox.checked;

      if (subtask.done) {
        //Insert patch-function here
      }

      updateCheckboxState();
    });

    //delete subtask
    deleteSubtaskBtn.addEventListener("click", () => {
      deleteSubtask(subtaskID, taskID, projectID);
      console.log("hej");
    });

    li.append(checkbox, subtaskTitle, deleteSubtaskBtn);
    subtaskContainer.append(li);
  }
  updateCheckboxState();
}

//Eventlisteners

closeTaskCardBtn.addEventListener("click", () => {
  taskmodalContainer.style.display = "none";
});
