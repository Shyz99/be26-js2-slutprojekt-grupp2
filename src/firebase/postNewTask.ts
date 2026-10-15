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

interface Id {
  ID: string;
}

export async function postNewTask(
  data: Record<string, any>,
  URLEndPoint: string,
  options: ModalOptions,
): Promise<boolean> {
  const projectID = options.projectID;

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
    // const responseProject = await fetch(`${baseURL}/project/${projectID}/tasks.json`, postOptions);
    // if(!responseProject.ok){
    //     throw 'Something went wrong'
    // }
    // const dataProject = await responseProject.json();

    const responseTask = await fetch(
      `${baseURL}${URLEndPoint}.json`,
      postOptions,
    );
    if (!responseTask.ok) {
      throw "Something went wrong";
    }
    const dataTask = await responseTask.json();

    if (dataTask) {
      const newTaskID: Id = {
        ID: dataTask.name,
      };

      const postIDOptions = {
        method: "PUT",
        body: JSON.stringify(""),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // const dataProject = await responseProject.json();

      try {
        // const responseProject = await fetch(`${baseURL}/project/${projectID}/tasks.json`, postOptions);
        // if(!responseProject.ok){
        //     throw 'Something went wrong'
        // }
        // const dataProject = await responseProject.json();

        const responseTask = await fetch(
          `${baseURL}${URLEndPoint}.json`,
          postOptions,
        );
        if (!responseTask.ok) {
          throw "Something went wrong";
        }
        const dataTask = await responseTask.json();

        if (dataTask) {
          const newTaskID: Id = {
            ID: dataTask.name,
          };

          const postIDOptions = {
            method: "PUT",
            body: JSON.stringify(""),
            headers: {
              "Content-Type": "application/json",
            },
          };
          const response = await fetch(
            `${baseURL}/project/${projectID}/tasks/${newTaskID.ID}.json`,
            postIDOptions,
          );
          if (!response.ok) {
            return false;
          }
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("POST gick fel", error);
        return false;
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("POST gick fel", error);
    return false;
  }
}
