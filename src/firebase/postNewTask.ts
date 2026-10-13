import { baseURL } from "./firebaseRequestURL.ts"; 
import type { ModalOptions } from "../components/modals/Modal.ts";


interface Task {
    description: string; 
    deadline: string; 
    category: {
        backend: boolean;
        frontend: boolean;
        ux: boolean;
    };
    member: {}; 
    priority: number; 
    created: string; 
    status: {
        new: boolean; 
        ongoing: boolean; 
        done: boolean; 
    }; 
    subtask: {}; 
    title: string; 
}


export async function postNewTask(data: Record<string, any>, URLEndPoint:string, options: ModalOptions): Promise <boolean>{
    // TODO: code
    // ! remember: boolean return.... on all our posts... do we need the if statements in Dynamic Post Check? 
    const projectID = options.projectID; 

    const task: Task = {
        description: data.description, 
        deadline: data.deadline, 
        category: {
            backend: data.backend === true || data.backend === "true",
            frontend: data.frontend === true || data.frontend === "true",
            ux: data.ux === true || data.ux === "true"
        },
        member: {}, 
        priority: data.priority, 
        created: data.created, 
        status: {
            new: true, 
            ongoing: false, 
            done: false
        }, 
        subtask: {},
        title: data.title
    }

    const postOptions = {
        method: 'POST', 
        body: JSON.stringify(task), 
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await fetch(`${baseURL}/${projectID}${URLEndPoint}.json`, postOptions);
        if(!response.ok){
            throw 'Something went wrong'
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