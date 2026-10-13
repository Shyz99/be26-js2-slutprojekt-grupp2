import { baseURL } from "./firebaseRequestURL.ts";

interface Project {
    description: string; 
    deadline: string; 
    members: {
    }; 
    name: string; 
    tasks: {}; 

}

export async function postNewProject(data: Record<string, any>, URLEndPoint:string): Promise<boolean>{
    
    const project: Project = {
        description: data.description, 
        deadline: data.deadline, 
        members: {}, 
        name: data.name, 
        tasks: {}
    }

    const options = {
        method: 'POST', 
        body: JSON.stringify(project), 
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(`${baseURL}${URLEndPoint}.json`, options);
        if (!response.ok){
            throw 'Something went wrong'
        }

        const data = await response.json(); 
        if(data){
            return true;
        }
        else {
            return false; 
        }
    }
    catch(error){
        console.log('POST gick fel', error);
        return false; 
    }
}