import type { ModalOptions } from "../components/modals/Modal.ts";
import { baseURL } from "./firebaseRequestURL.ts";

export async function patchMemberToTask(data: Record<string, any>, URLEndPoint: string, options: ModalOptions): Promise<boolean> {

    if (!options.taskID || !data.memberID) {
        return false;
    }

    const taskID = options.taskID;
    const memberID = data.memberID; 

    const patchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            member: memberID
        })
    }

    try {
        const responseTask = await fetch(`${baseURL}${URLEndPoint}/${taskID}.json`, patchOptions);
        if (!responseTask.ok) {
            return false;
        }
        const dataTask = await responseTask.json();
        
        const responseProject = await fetch(`${baseURL}/project/tasks/${taskID}.json`, patchOptions);
        if(!responseProject.ok) {
            return false; 
        }
        const dataProject = await responseProject.json(); 
        if (dataTask && dataProject) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.error("PATCH gick ej", error);
        return false;
    }
}