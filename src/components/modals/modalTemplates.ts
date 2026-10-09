export interface formConfigurations {
    title: string; 
    postEndpoint: string; 
    elements: string; 
}

export const formViews: Record<string, formConfigurations> = {
    // IDs for each view we want - feel free to add more gang!
    'add-member': {
        title: 'Lägg till en ny medlem',
        postEndpoint: '',
        elements: ''

    }, 

    'add-task': {
        title: 'Lägg till en ny uppgift', 
        postEndpoint: '', 
        elements: ''
    }
}


