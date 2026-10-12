function currentDate():string{
    return new Date().toLocaleDateString('sv-SE');
}

export const date = currentDate(); 
