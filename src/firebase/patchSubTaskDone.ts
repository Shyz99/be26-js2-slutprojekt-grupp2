import { baseURL } from "./firebaseRequestURL.ts";

export async function patchSubtaskDone(parentTaskId: string, subtaskId: string): Promise<any> {
    if (!parentTaskId || !subtaskId) {
        console.error("Parent task ID eller subtask ID saknas");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/task/${parentTaskId}/subtask/${subtaskId}.json`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    done: true
                })
            }
        );

        if (!response.ok) {
            throw new Error("Kunde inte uppdatera subtask-status (done)");
        }

        const result = await response.json();
        return result !== null;

    } catch (error) {
        console.error("PATCH av subtask status (done) misslyckades", error);
        return false;
    }
}