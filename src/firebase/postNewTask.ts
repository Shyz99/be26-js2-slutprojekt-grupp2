import { baseURL } from "./firebaseRequestURL.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";

interface Task {
  description: string;
  deadline: string;
  category: {
    backend: boolean;
    frontend: boolean;
    ux: boolean;
  };
  member: {};
  priority: number;
  created: string;
  status: {
    new: boolean;
    ongoing: boolean;
    done: boolean;
  };
  subtask: {};
  title: string;
}

export async function postNewTask(
  data: Record<string, any>,
  URLEndPoint: string,
  options: ModalOptions,
): Promise<boolean> {
  const projectID = options.projectID;

  if (!projectID) {
    console.error("Project ID saknas");
    return false;
  }

  const task: Task = {
    description: data.description,
    deadline: data.deadline,
    category: {
      backend: data.backend === true || data.backend === "true",
      frontend: data.frontend === true || data.frontend === "true",
      ux: data.ux === true || data.ux === "true",
    },
    member: {},
    priority: data.priority,
    created: data.created,
    status: {
      new: true,
      ongoing: false,
      done: false,
    },
    subtask: {},
    title: data.title,
  };

  const postOptions = {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // 1. Skapa tasken i databasen
    const responseTask = await fetch(
      `${baseURL}${URLEndPoint}.json`,
      postOptions,
    );
    if (!responseTask.ok) {
      throw new Error("Kunde inte skapa task");
    }

    const dataTask = await responseTask.json();

    if (!dataTask || !dataTask.name) {
      return false;
    }

    const newTaskID = {
      ID: dataTask.name,
    };

    const postIDOptions = {
      method: "PUT",
      body: JSON.stringify(""),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // 2. Koppla tasken till projektet
    const response = await fetch(
      `${baseURL}/project/${projectID}/tasks/${newTaskID.ID}.json`,
      postIDOptions,
    );

    if (!response.ok) {
      return false;
    }

    window.location.reload();

    return true;
  } catch (error) {
    console.error("POST av ny task misslyckades", error);
    return false;
  }
}
