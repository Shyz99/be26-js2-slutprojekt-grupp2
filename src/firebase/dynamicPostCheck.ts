// TODO: FIX.... 
// export async function posts(data: Record<string, any>, endPointURL: any): Promise<boolean>{
//     switch (endPointURL) {
//         // TODO add all the links and send to correct function
//         case '': 
//         return await 
//     }
// } 

import { postNewMember } from "./postNewMember.ts";

export async function dynamicPostCheck(data: Record<string, any>, URLEndPoint: string) {
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

    }

    if (URLEndPoint === "/subtask") {
        if (data.taskID) {
            const correctEndPointURL = "data.taskID/subtask";
            const success = await postSubtask(data, correctEndPointURL);
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

}