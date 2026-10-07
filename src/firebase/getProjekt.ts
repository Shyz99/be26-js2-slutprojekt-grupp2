import { baseURL } from "./firebaseRequestURL";

export async function getDataFromFirebase(key: string) {
  try {
    const response = await fetch(baseURL + key + ".json");
    if (!response.ok) {
      throw new Error("Fetching all projects from Firebased failed");
    }

    const data = await response.json();
    console.log("DATA:", data);
    return data;
  } catch (error) {
    throw error;
  }
}
