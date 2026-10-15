import { baseURL } from "./firebaseRequestURL.ts";
import { renderIndex } from "../components/render/renderIndex.ts";
import { cleanIndex } from "../components/render/cleanIndex.ts";

interface Project {
  description: string;
  deadline: string;
  members: { placeholderMember: string };
  name: string;
  tasks: { placeholdeTask: string };
  subtask: { placeholderSubTask: string };
}

export async function postNewProject(
  data: Record<string, any>,
  URLEndPoint: string,
): Promise<boolean> {
  const project: Project = {
    description: data.description,
    deadline: data.deadline,
    members: { placeholderMember: "" },
    name: data.name,
    tasks: { placeholdeTask: "" },
    subtask: { placeholderSubTask: "" },
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
