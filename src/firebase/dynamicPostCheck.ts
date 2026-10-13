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

export async function dynamicPostCheck(data: Record<string, any>, URLEndPoint: string, options: ModalOptions) {
    if (URLEndPoint === "/member") {
        const success = await postNewMember(data, URLEndPoint);
        if (success) {
            return true;
        }
        else {
            return false;
        }
    }

    if (URLEndPoint === "/project") {
        const success = await postNewProject(data, URLEndPoint);
        if (success) {
            return true;
        }
        else {
            return false;
        }
    }

    if (URLEndPoint === "/task") {
        
        const success = await postNewTask(data, URLEndPoint, options);

        if (success) {
            return true;
        }
        else {
            return false;
        }
    }

    if (URLEndPoint === "/subtask") {

        if (data.taskID) {
            const correctEndPointURL = `${data.taskID}/subtask`;
            const success = await postNewSubtask(data, correctEndPointURL, options);

            if (success) {
                return true
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }

    }

    if (URLEndPoint === "/project" && options.projectID){
        // patch for adding member to a project 

        
    }

    if (URLEndPoint === "/task" && m){
        // patch to add member to task 
    }

    

}