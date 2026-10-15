import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import type { Member, Subtask, Task } from "../../models/models.ts";
import { Modal } from "../modals/Modal.ts";

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
const newSubtaskForm = document.getElementById(
  "new-subtask-form",
) as HTMLFormElement;
const taskmodalContainer = document.querySelector(
  ".taskmodal-container",
) as HTMLDivElement;

export async function renderTaskCard(
  task: Task,
  taskID: string,
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

  //Hämta patch-funktion task-status
  saveNewTaskCardChanges.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = Modal.getInstance();
    modal.trigger(saveNewTaskCardChanges, "patch-task-status", {
      taskID: taskID,
    });
    console.log("hej");
  });
  //

  //
  //Rendera innuti modalerna
  const formattedDeadline = task.deadline;

  if (task.status.new === true) {
    taskModal.classList.add("new-task-modal");
    cardTitle.innerHTML = `${task.title}`;
    delegateContainer.classList.remove("hidden");

    cardInfoContainer.innerHTML = `<p>Description: ${task.description}</p>
    <p>Created: ${task.created}</p>
    <p>Category: ${delegatedRole}</p>
    <p>Deadline: ${formattedDeadline} <button>Change</button></p>
    <p>Priority: ${task.priority} <button>Change</button></p>`;
  
  } else if (task.status.ongoing === true) {
    taskModal.classList.add("ongoing-task-modal");
    cardTitle.innerHTML = `${task.title}`;
    taskDoneBtn.classList.remove("hidden");
    subtaskContainer.classList.remove("hidden");
    newSubtaskContainer.classList.remove("hidden");

    cardInfoContainer.innerHTML = `<p>Description: ${task.description}</p>
    <p>Created: ${task.created}</p>
    <p>Category: ${delegatedRole}</p>
    <p>Deadline: ${formattedDeadline} <button>Change</button></p>
    <p>Priority: ${task.priority} <button>Change</button>
    </p><p>Delegated member: ${taskMemberName}</p>`;
  
  } else if (task.status.done === true) {
    taskModal.classList.add("done-task-modal");
    cardTitle.innerHTML = `<h3>Task done!</h3> ${task.title}`;
    deleteTaskBtn.classList.remove("hidden");

    cardInfoContainer.innerHTML = `<p>Description: ${task.description}</p>
    <p>Created: ${task.created}</p>
    <p>Category: ${delegatedRole}</p>
    <p>Deadline: ${formattedDeadline} <button>Change</button></p>
    <p>Delegated member: ${taskMemberName}</p>`;
  }

  renderSubtasks(task.subtask);
}

function renderSubtasks(subtasks: Subtask[]): void {
  subtaskContainer.innerHTML = "";
  console.log(subtasks);

  const subtaskArray = Object.values(subtasks);
  //omvandlar objekten till en array

  function updateCheckboxState() {
    const allDone = subtaskArray.every((taskChecked) => {
      return taskChecked.done === true;
    });
    if (allDone || subtaskArray.length < 0) {
      taskDoneBtn.classList.remove("disable-button");
    } else {
      taskDoneBtn.classList.add("disable-button");
    }
  }

  for (const subtask of subtaskArray) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const deleteSubtaskBtn = document.createElement("button");
    deleteSubtaskBtn.innerText = "Delete";
    const subtaskTitle = document.createElement("span");
    subtaskTitle.innerHTML = `${subtask.description}    `;

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

    deleteSubtaskBtn.addEventListener("click", () => {
      //Insert delete-function here
    });

    label.append(checkbox, subtaskTitle, deleteSubtaskBtn);
    subtaskContainer.append(label);
  }
  updateCheckboxState();
}

//Eventlisteners

closeTaskCardBtn.addEventListener("click", () => {
  taskmodalContainer.style.display = "none";
});

// saveNewTaskCardChanges.addEventListener("click", () => {
//   const selectedMember = delegateToMember.value;
//Insert patch-function for change task.status from new to ongoing
//Insert patch member to task
// });

taskDoneBtn.addEventListener("click", () => {
  //Insert patch-function here
});

deleteTaskBtn.addEventListener("click", () => {
  //Insert delete-function here
});

newSubtaskForm.addEventListener("submit", () => {
  const newSubtask = document.getElementById("new-subtask") as HTMLInputElement;

  const subtask = newSubtask.value;
  //Insert post-function here
});
