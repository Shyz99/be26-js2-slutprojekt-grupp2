import { baseURL } from "./firebaseRequestURL";

export async function getProjectsWithID(memberID: string) {
  try {
    const response = await fetch(
      baseURL + "/member/" + memberID + "/project/.json",
    );
    if (!response.ok) {
      throw new Error("Fetching data from Firebased failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMembersWithID(projectID: string) {
  try {
    const response = await fetch(
      baseURL + "/project/" + projectID + "/members/.json",
    );
    if (!response.ok) {
      throw new Error("Fetching data from Firebased failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
