export interface formConfigurations {
    title: string; 
    postForm: string; 
    elements: string; 
}

export const formViews: Record<string, formConfigurations> = {
    // IDs for each view we want - feel free to add more gang!
    'test': {
        title: 'test', 
        postForm: '', 
        elements: ''
    },
    'add-member': {
        title: 'Lägg till en ny medlem',
        // postForm adds link .... change name? 
        // TODO change name 
        postForm: '',
        elements: ''

    }, 

    'add-task': {
        title: 'Lägg till en ny uppgift', 
        postForm: '', 
        elements: ''
    }
}


