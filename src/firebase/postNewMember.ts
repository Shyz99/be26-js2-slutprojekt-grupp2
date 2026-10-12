// TODO: Import baseURL 
// TODO: take paragrams from dynamic function
export async function postNewMember(data: Record<string, any>, URLEndPoint: string):Promise<boolean>{
    const options = {
        method: 'POST', 
        body: JSON.stringify({
            // TODO: fix object using data
            prop: 'value'
        }), 
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        // TODO: make sure the end point is attached to the baseURL 
        const response = await fetch(URLEndPoint, options);
        if (!response.ok){
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