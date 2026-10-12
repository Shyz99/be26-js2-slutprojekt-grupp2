import { date } from "./currentDate.ts";

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
    'post-new-member': {
        modalTitle: 'Lägg till en ny medlem:',
        URLEndPoint: '/member',
        HTMLElements: `

        <fieldset>
            <legend>Namn</legend>
                <input type="text" name="name" required placeholder="Namn">
        </fieldset>

        <fieldset>
            <legend>Kategori</legend>
    
            <input type="hidden" name="backend" value="false">
            <label><input type="checkbox" name="backend" value="true"> Backend </label>
    
            <input type="hidden" name="frontend" value="false">
            <label><input type="checkbox" name="frontend" value="true"> Frontend </label>
    
            <input type="hidden" name="ux" value="false">
            <label><input type="checkbox" name="ux" value="true"> UX </label>
        </fieldset>

        <fieldset>

            <legend>Projekt</legend>
    
            <input type="hidden" name="projekt-title" value="{}">
            <input type="text" name="project-title" placeholder="Projekt namn...">

        </fieldset>
        `

    },
    'post-new-project': {
        modalTitle: 'Lägg till ett nytt projekt:',
        URLEndPoint: '/project',
        HTMLElements: `
        <fieldset>
            <legend>Projekt Namn</legend>

            <input type="text" name="name" required placeholder="Projekt namn...">
        </fieldset>
        
        <fieldset>
            <legend>Projekt Detaljer</legend>

            <input type="text" name="description" required placeholder="Beskrivning...">
            <input type="text" name="deadline" required placeholder="Deadline...">
            <input type="hidden" name="members" value="{}">
            <input type="text" name="members" placeholder="Medlemmar...">
                        
        </fieldset>
        `
    },

    'add-new-task': {
        modalTitle: 'Lägg till en ny uppgift',
        URLEndPoint: '/task',
        // TODO: Add the ability to add subtasks
        HTMLElements: `
        <fieldset>
            <legend>Uppgift</legend>

            <input type"text" name="title" required placeholder="Titel...">
            <input type="text" name="description" required placeholder="Uppgiftens beskrivning...">
            <input type="text" name="deadline" required placeholder="Uppgiften ska vara klar...">
            <input type="text" name="member" required placeholder="Ansvarig medlem...">
            <input type="text" name="priority" required placeholder="Prioritets nummer...">
            <input type="hidden" name="created" value="${date}">
            <input type="hidden" name="subtask" value="{}">

        </fieldset>

        <fieldset>
            <legend>Kategori</legend>
    
            <input type="hidden" name="backend" value="false">
            <label><input type="checkbox" name="backend" value="true"> Backend </label>
    
            <input type="hidden" name="frontend" value="false">
            <label><input type="checkbox" name="frontend" value="true"> Frontend </label>
    
            <input type="hidden" name="ux" value="false">
            <label><input type="checkbox" name="ux" value="true"> UX </label>
        </fieldset>

        <fieldset>
            <legend>Status</legend>
    
            <input type="hidden" name="new" value="false">
            <label><input type="checkbox" name="new" value="true"> Ny </label>
    
            <input type="hidden" name="ongoing" value="false">
            <label><input type="checkbox" name="ongoing" value="true"> Pågående </label>
    
            <input type="hidden" name="done" value="false">
            <label><input type="checkbox" name="done" value="true"> Färdig </label>
        </fieldset>
        `
    },

    'add-new-subtask': {
        modalTitle: 'Lägg till en ny subuppgift',
        
        URLEndPoint: '/subtask',
        HTMLElements:` <fieldset>
            <legend> Subuppgift </legend>

            <input type="text" name="description" required placeholder="Beskrivning...">
            <input type="text" name="deadline" required placeholder="Uppgiften ska vara klar...">
            <input type="text" name="priority" required placeholder="Prioritets nummer...">
            <input type="hidden" name="created" value="${date}">
        </fieldset>

        <fieldset>
            <legend>Kategorier</legend>
    
            <input type="hidden" name="backend" value="false">
            <label><input type="checkbox" name="backend" value="true"> Backend </label>
    
            <input type="hidden" name="frontend" value="false">
            <label><input type="checkbox" name="frontend" value="true"> Frontend </label>
    
            <input type="hidden" name="ux" value="false">
            <label><input type="checkbox" name="ux" value="true"> UX </label>
        </fieldset>
        `
    }
}


