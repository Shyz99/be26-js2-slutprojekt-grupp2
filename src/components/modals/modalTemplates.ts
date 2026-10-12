export interface formConfigurations {
    modalTitle: string; 
    URLEndPoint: string; 
    HTMLElements: string; 
}


export const formViews: Record<string, formConfigurations> = {
    // IDs for each view we want - feel free to add more gang!
    'test': {
        modalTitle: 'test', 
        URLEndPoint: '', 
        HTMLElements: ''
    },
    'add-member': {
        modalTitle: 'Lägg till en ny medlem',
        URLEndPoint: '',
        HTMLElements: ''

    }, 

    'add-task': {
        modalTitle: 'Lägg till en ny uppgift', 
        URLEndPoint: '', 
        HTMLElements: ''
    },
    
    'add-subtask': {
        modalTitle: '',
        URLEndPoint: '', 
        HTMLElements: ''
    }
}


