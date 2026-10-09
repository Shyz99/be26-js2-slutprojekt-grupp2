export interface formConfigurations {
    title: string; 
    postForm: string; 
    elements: string; 
}

// use these, gang, for creating new "modals" 
// title is the text that shows up
// postForm is the endpoint of the URL used to post or the entire URL depending on how I build it in the future heh
// elements is the HTML elements created to make the modal look the way it does, aka inputs for form etc. buttons are in Modal.ts.
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


