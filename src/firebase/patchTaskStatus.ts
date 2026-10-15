import { baseURL } from "./firebaseRequestURL.ts"; 
import type { ModalOptions } from "../components/modals/Modal.ts";
import { showToast, getErrorMessage } from "../components/errors/toast.ts";


// Catherine - när du vill koppla detta till en knapp att uppdatera status så skapa en modal: 
    // t.ex. const btnPatch = document.create -etc
    // const modal = Modal.getInstance();
    // modal.trigger(btnPatch, 'patch-task-status', {taskID: taskID})
    // obvi appenda knappen till whatever också men ja

// det enda du behöver fixa är att taskID: ___ är korrekt task ID :3 så min funktion vet vilken task som patchas 


type TaskStatus = "new" | "ongoing" | "done";

export async function patchTaskStatus(data: Record<string, any>, URLEndPoint: string, options: ModalOptions):Promise<boolean>{
    const taskID = options.taskID;
    const status = data.status as TaskStatus;

     if (!taskID || !["new", "ongoing", "done"].includes(status)) {
        return false;
    }

    const patchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: {
                new: status === "new",
                ongoing: status === "ongoing",
                done: status === "done"
            }
        })
    }

    try {
        const response = await fetch(`${baseURL}${URLEndPoint}/${taskID}.json`, patchOptions);

        if (!response.ok) {
            throw new Error("Could not update task status");
        }

        const data = await response.json();
        if (data) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        showToast(getErrorMessage(error));
        console.error("PATCH av status misslyckades", error);
        return false;
    }


}