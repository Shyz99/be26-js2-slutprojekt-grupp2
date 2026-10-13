import { baseURL } from "./firebaseRequestURL.ts"; 
import type { ModalOptions } from "../components/modals/Modal.ts";

interface Subtask {
    description: string; 
    done: boolean;
    member: string;
}
export async function postNewSubtask(data: Record<string, any>, URLEndPoint: string, options: ModalOptions){
    // TODO: code lol 
    // ! remember: the subtasks take a different endpoint then the others

    const taskID = options.taskID; 

    const task: Subtask = {
        description: data.description, 
        done: data.done, 
        member: data.member
    }

    const postOptions = {
        method: 'POST', 
        body: JSON.stringify(task), 
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await fetch(`${baseURL}/${taskID}${URLEndPoint}.json`, postOptions);
        if(!response.ok){
            throw 'Something went wrong'; 
        }
        const data = await response.json(); 
        if(data){
            return true; 
        }
        else{
            return false; 
        }

    }
    catch(error){
        console.log('POST gick fel', error); 
        return false; 
    }
}