// TODO: FIX.... 
// export async function posts(data: Record<string, any>, endPointURL: any): Promise<boolean>{
//     switch (endPointURL) {
//         // TODO add all the links and send to correct function
//         case '': 
//         return await 
//     }
// } 

import { postNewMember } from "./postNewMember.ts";
import { postNewProject } from "./postNewProject.ts"; 
import { postNewTask } from "./postNewTask.ts";
import { postNewSubtask } from "./postNewSubtask.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";
import { patchMemberToProject } from "./patchMemberToProject.ts";

export async function dynamicPostCheck(data: Record<string, any>, URLEndPoint: string, options: ModalOptions) {
    
    if (URLEndPoint === "/project" && options.projectID && data.memberID){
        return await patchMemberToProject(data, URLEndPoint, options);            
    }

    if (URLEndPoint === "/task" && options.taskID && data.memberID){
        // patch to add member to task 
        
    }

    if (URLEndPoint === "/member") {
        return await postNewMember(data, URLEndPoint);        
    }

    if (URLEndPoint === "/project") {
        return await postNewProject(data, URLEndPoint);       
    }

    if (URLEndPoint === "/task") {
        return await postNewTask(data, URLEndPoint, options);
    }

    if (URLEndPoint === "/subtask") {
        if (options.taskID) {
            const correctEndPointURL = `${options.taskID}/subtask`;
            return await postNewSubtask(data, correctEndPointURL, options);
        }
        else {
            return false;
        }
    }


    

    

}