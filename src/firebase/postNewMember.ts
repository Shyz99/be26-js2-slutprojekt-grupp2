import { baseURL } from "./firebaseRequestURL.ts";
import { renderIndex } from "../components/render/renderIndex.ts";
import { cleanIndex } from "../components/render/cleanIndex.ts";

interface Member {
  name: string;
  category: {
    backend: boolean;
    frontend: boolean;
    ux: boolean;
  };
  project: Record<string, string>;
  tasks: number;
  subtasks: number;
}

export async function postNewMember(
  data: Record<string, any>,
  URLEndPoint: string,
): Promise<boolean> {
  const member: Member = {
    name: data.name,
    category: {
      backend: data.backend === true || data.backend === "true",
      frontend: data.frontend === true || data.frontend === "true",
      ux: data.ux === true || data.ux === "true",
    },
    project: {},
    tasks: 0,
    subtasks: 0,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(member),
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
