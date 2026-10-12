// TODO: FIX.... 
// export async function posts(data: Record<string, any>, endPointURL: any): Promise<boolean>{
//     switch (endPointURL) {
//         // TODO add all the links and send to correct function
//         case '': 
//         return await 
//     }
// } 

import { postNewMember } from "./postNewMember.ts";

export async function dynamicPostCheck (data: Record<string, any>, URLEndPoint: string){
    switch (URLEndPoint){
        case "":
            const success = await postNewMember(data, URLEndPoint);
            if(success){
                return true; 
            }
            else {
                return false;
            }
            
    }
}