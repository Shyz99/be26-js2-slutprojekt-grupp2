
export async function postNewMember(PostObj: Record<string, any>, URL: string):Promise<boolean>{
    const options = {
        method: 'POST', 
        body: JSON.stringify( {
            prop: 'value'
        }), 
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const response = await fetch(URL, options);
        if (!response.ok){
            throw 'Something went wrong'
        }
        const data = await response.json(); 
        return true; 

    }
    catch(error){
        console.log('POST gick fel', error);
        return false; 
    }
    
}