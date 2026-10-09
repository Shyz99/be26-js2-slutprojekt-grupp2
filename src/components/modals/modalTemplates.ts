export interface formConfigurations {
    title: string; 
    postForm: string; 
    elements: string; 
}

export const formViews: Record<string, formConfigurations> = {
    // IDs for each view we want - feel free to add more gang!
    'add-member': {
        title: 'Lägg till en ny medlem',
        // postForm does not require <form> - only add the inputs needed
        postForm: '',
        elements: ''

    }, 

    'add-task': {
        title: 'Lägg till en ny uppgift', 
        postForm: '', 
        elements: ''
    }
}


