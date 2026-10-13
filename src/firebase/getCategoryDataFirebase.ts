import { baseURL } from "./firebaseRequestURL";

export async function getCategoryDataFirebase(category: string, id?: string) {
  if (id !== undefined) {
    id = "/" + id;
  } else {
    id = "";
  }

  try {
    const response = await fetch(`${baseURL}/${category}/${id}.json`);
    if (!response.ok) {
      throw new Error("Fetching data from Firebased failed");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
