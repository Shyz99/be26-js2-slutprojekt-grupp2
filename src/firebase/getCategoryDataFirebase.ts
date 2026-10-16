import { baseURL } from "./firebaseRequestURL"; 
import { showToast, getErrorMessage } from "../components/errors/toast.ts";

export async function getCategoryDataFirebase(category: string, id?: string) {
  if (id !== undefined) {
    id = "/" + id;
  } else {
    id = "";
  }

  try {
    const response = await fetch(`${baseURL}/${category}/${id}.json`);
    if (!response.ok) {
      throw new Error(`Firebase request failed: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    showToast(getErrorMessage(error));
    console.error("Kunde inte hämta data från Firebase:", error); // error message in console
    throw error;
  }
}

