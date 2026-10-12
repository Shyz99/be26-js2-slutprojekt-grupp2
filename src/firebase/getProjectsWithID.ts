import { baseURL } from "./firebaseRequestURL";

export async function getProjectsWithID(member: string) {
  try {
    const response = await fetch(
      baseURL + "/member/" + member + "/project/.json",
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
