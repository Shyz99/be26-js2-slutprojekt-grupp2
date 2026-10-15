import { baseURL } from "./firebaseRequestURL.ts"; 


interface Subtask {
    description: string; 
    done: boolean;
    member: {placeholder: true};
}
export async function postNewSubtask(data: Record<string, any>, correctURLEndPoint: string){

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
        const response = await fetch(`${baseURL}/task/${correctURLEndPoint}.json`, postOptions);
        if(!response.ok){
            throw 'Something went wrong'; 
        }
        const data = await response.json(); 
        if(data){
            // patcha
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