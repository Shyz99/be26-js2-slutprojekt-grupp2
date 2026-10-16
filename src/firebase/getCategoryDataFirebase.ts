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
      throw new Error("Fetching data from Firebase failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    showToast(getErrorMessage(error));
    console.error("Kunde inte hämta data från Firebase:", error); // error message in console
    throw error;
  }
}
