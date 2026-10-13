import { baseURL } from "./firebaseRequestURL.ts"; 
import type { ModalOptions } from "../components/modals/Modal.ts";

interface Subtask {
    description: string; 
    done: boolean;
    member: {placeholder: true};
}
export async function postNewSubtask(data: Record<string, any>, URLEndPoint: string, options: ModalOptions){
    // TODO: code lol 
    // ! remember: the subtasks take a different endpoint then the others

    const taskID = options.taskID; 

    const task: Subtask = {
        description: data.description, 
        done: data.done, 
        member: {placeholder: true}
    }

    const postOptions = {
        method: 'POST', 
        body: JSON.stringify(task), 
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await fetch(`${baseURL}/task/${URLEndPoint}.json`, postOptions);
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