import { baseURL } from "./firebaseRequestURL.ts";
import { renderIndex } from "../components/render/renderIndex.ts";
import { cleanIndex } from "../components/render/cleanIndex.ts";

interface Project {
  description: string;
  deadline: string;
  members: { };
  name: string;
  tasks: {};
  subtask: {};
}

export async function postNewProject(
  data: Record<string, any>,
  URLEndPoint: string,
): Promise<boolean> {
  const project: Project = {
    description: data.description,
    deadline: data.deadline,
    members: { },
    name: data.name,
    tasks: {},
    subtask: {},
  };

  const options = {
    method: "POST",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${baseURL}${URLEndPoint}.json`, options);
    if (!response.ok) {
      throw "Something went wrong";
    }

    const data = await response.json();
    if (data) {
      await cleanIndex();
      await renderIndex();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("POST gick fel", error);
    return false;
  }
}
