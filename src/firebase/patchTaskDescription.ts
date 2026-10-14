import { baseURL } from "./firebaseRequestURL.ts"; 
import type { ModalOptions } from "../components/modals/Modal.ts";


export async function patchTaskDeadline(data: Record<string, any>, URLEndPoint: string, options: ModalOptions):Promise<boolean>{
    const taskID = options.taskID;
    const newDescription = data.description; 

     if (!taskID) {
        return false;
    }

    const patchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: newDescription
        })
    }

    try {
        const response = await fetch(`${baseURL}${URLEndPoint}/${taskID}.json`, patchOptions);

        if (!response.ok) {
            throw new Error("Kan inte uppdatera beskrivningen");
        }

        const data = await response.json();
        if (data) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.error("PATCH av beskrivning misslyckades", error);
        return false;
    }


}