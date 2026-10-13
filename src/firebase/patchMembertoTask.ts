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
        const response = await fetch(`${baseURL}${URLEndPoint}/${taskID}.json`, patchOptions);
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        if (data) {
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