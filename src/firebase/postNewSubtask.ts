import { baseURL } from "./firebaseRequestURL.ts";
import type { ModalOptions } from "../components/modals/Modal.ts"; 


interface Subtask {
    description: string;
    done: boolean;
    member: {};
}

interface Id {
    ID: string;
}

export async function postNewSubtask(data: Record<string, any>, correctURLEndPoint: string, options: ModalOptions) {
    const projectID = options.projectID;

    const task: Subtask = {
        description: data.description,
        done: data.done,
        member: {}
    }

    const postOptions = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(`${baseURL}/task/${correctURLEndPoint}.json`, postOptions);
        if (!response.ok) {
            throw 'Something went wrong';
        }

        const data = await response.json();

        if (data) {
            const newSubtaskID: Id = {
                ID: data.name
            };

            const postIDOptions = {
                method: 'PUT',
                body: JSON.stringify(" "),
                headers: {
                    'Content-Type': 'application/json'
                }

            }
            const response = await fetch(`${baseURL}/project/${projectID}/subtask/${newSubtaskID.ID}.json`, postIDOptions);
            if (!response.ok) {
                return false;
            }

            return true;
        }
        else {
            return false;
        }

    }
    catch (error) {
        console.log('POST gick fel', error);
        return false;
    }
}