import { date } from "./currentDate.ts";

export interface formConfigurations {
  modalTitle: string;
  URLEndPoint: string;
  HTMLElements: string;
}

export const formViews: Record<string, formConfigurations> = {
  test: {
    modalTitle: "test",
    URLEndPoint: "",
    HTMLElements: "",
  },
  "post-new-member": {
    modalTitle: "Lägg till en ny medlem:",
    URLEndPoint: "/member",
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
        `,
  },
  "post-new-project": {
    modalTitle: "Lägg till ett nytt projekt:",
    URLEndPoint: "/project",
    HTMLElements: `
        
        <fieldset>
            <legend>Projekt Namn</legend>

            <input type="text" name="name" required placeholder="Projekt namn...">
        </fieldset>
        
        <fieldset>
            <legend>Projekt Detaljer</legend>

            <input type="text" name="description" required placeholder="Beskrivning...">
            <input type="text" name="deadline" required placeholder="Deadline: format 2026-06-26...">
                        
        </fieldset>
        `,
  },

  "add-new-task": {
    modalTitle: "Lägg till en ny uppgift",
    URLEndPoint: "/task",
    HTMLElements: `
        
        <fieldset>
            <legend>Uppgift</legend>

            <input type="text" name="title" required placeholder="Titel...">
            <input type="text" name="description" required placeholder="Uppgiftens beskrivning...">
            <input type="text" name="deadline" required placeholder="Deadline: format 2026-06-26...">
            <input type="hidden" name="created" value="${date}">
            <input type="hidden" name="subtask" value="{}">
            <legend>Välj prioritet:</legend>

            <div class="priority-options">
                <label class="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="1"
                        required
                    >
                    <span>Låg (1)</span>
                </label>

                <label class="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="2"
                    >
                    <span>Medel (2)</span>
                </label>

                <label class="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="3"
                    >
                    <span>Hög (3)</span>
                </label>
            </div>
        </fieldset>

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
        `,
  },

  "add-new-subtask": {
    modalTitle: "Lägg till en ny subuppgift",
    URLEndPoint: "/subtask",
    HTMLElements: ` 
        
        <fieldset>
            <legend> Subuppgift </legend>
            <input type="hidden" name="done" value="false">
            <input type="text" name="description" required placeholder="Beskrivning...">
        </fieldset>

        `
    },
    
    'patch-member-to-project': {
        modalTitle: 'Välj en medlem:',
        URLEndPoint: '/project',
        HTMLElements: `

        <fieldset>
            <select id="member-selector" name="memberID" required>
                <option value="">Laddar medlemmar...</option>
            </select>
        </fieldset>
    `,
  },

  "patch-task-status": {
    modalTitle: "Välj ny status:",
    URLEndPoint: "/task",
    HTMLElements: `
        
        <fieldset>
        
            <select id="status-selector" name="status" required>
                <option value="">Välj status...</option>
                <option value="new">Ny</option>
                <option value="ongoing">Pågående</option>
                <option value="done">Färdig</option>
            </select>
            
        </fieldset>
    

        `,
  },

  "patch-task-deadline": {
    modalTitle: "Välj ny deadline:",
    URLEndPoint: "/task",
    HTMLElements: `
        
        <fieldset>
        
            <input type="text" name="deadline" required placeholder="Deadline: format 2026-06-26...">
            
        </fieldset>
    

        `,
  },

  "patch-task-priority": {
    modalTitle: "Välj ny prioritering:",
    URLEndPoint: "/task",
    HTMLElements: `
        
        <fieldset>
            <legend>Välj prioritet:</legend>

            <div class="priority-options">
                <label class="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="1"
                        required
                    >
                    <span>Låg (1)</span>
                </label>

                <label class="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="2"
                    >
                    <span>Medel (2)</span>
                </label>

                <label class="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="3"
                    >
                    <span>Hög (3)</span>
                </label>
            </div>
        </fieldset>
    

        `,
  },

  "patch-task-description": {
    modalTitle: "Skriv en ny beskrivning:",
    URLEndPoint: "/task",
    HTMLElements: `
        
        <fieldset>
        
            <input type="text" name="description" required placeholder="Beskrivning...>
            
        </fieldset>
    

        `,
  },
};
