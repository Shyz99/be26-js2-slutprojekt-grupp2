// delete subtask from task
// delete subtask from project
// delete subtask from member 
// patch amount of tasks

import {baseURL} from "../firebaseRequestURL.ts";
import {updateAndCheckTaskCountMembers} from "../../components/render/updateAndCheckTaskCountMembers.ts";

export async function deleteSubtask(subtaskID:string, taskID:string, projectID:string):Promise<any>{

    if(!taskID || !projectID || subtaskID ){
        return; 
    }

    const deleteOptions = {
        method: 'DELETE'
    }

    try{
        const responseDelSubtask = await fetch(`${baseURL}/task/${taskID}/${subtaskID}.json`, deleteOptions); 
        if(!responseDelSubtask.ok){
            throw 'Raderingen fungerade inte'
        }
        const dataDelSubtask = await responseDelSubtask.json(); 

        const responseDelSubtaskFromProject = await fetch(`${baseURL}/project/${projectID}/subtask/${subtaskID}.json`, deleteOptions); 
        if(!responseDelSubtaskFromProject.ok){
            throw 'Raderingen fungerade inte'
        }
        const dataDelSubtaskFromProject = await responseDelSubtaskFromProject.json(); 
        if(dataDelSubtask && dataDelSubtaskFromProject){
            updateAndCheckTaskCountMembers() 
            return; 
        }
    }
    catch(error){
        throw error; 
    }

}