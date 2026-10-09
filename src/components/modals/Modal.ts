import { formViews } from "./modalTemplates.ts";
import type { formConfigurations } from "./modalTemplates.ts";
export class Modal {
    // static used here to ensure there is only ever one Modal open / saved in memory
    private static instance: Modal;
    private dialog: HTMLDialogElement;
    private activeView: formConfigurations | null = null;


    private constructor() {
        this.dialog = document.createElement('dialog');
        document.body.appendChild(this.dialog);
        // TODO CSS styles

        this.dialog.addEventListener('click', (e: MouseEvent) => {
            const border = this.dialog.getBoundingClientRect();
            const clickedInside = (
                e.clientX >= border.left &&
                e.clientX <= border.right &&
                e.clientY >= border.top &&
                e.clientY <= border.bottom
            );

            if (!clickedInside) {
                this.close();
            }
        });
    }

    public static getInstance(): Modal {
        if (!Modal.instance) {
            Modal.instance = new Modal();
        }
        return Modal.instance;
    }
    // for us all to use 
    public trigger(element: HTMLElement, formType: string): void {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            this.open(formType);
        });
    }

    public open(formID: string): void {
        const configForm = formViews[formID];

        if(!configForm) {
            console.log("ID finns inte bland våra formViews")
            return; 
        }
        this.activeView = configForm; 

        this.renderFormView(); 
        this.dialog.showModal(); 

    }
    public renderFormView(): void {
        if(!this.activeView){
            return;
        }

        this.dialog.innerHTML = `
      <h3 style="margin: 0 0 16px 0;">${this.activeView.title}</h3>
      <form id="modal-form">
        ${this.activeView.postEndpoint}
        <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
          <button type="button" id="modal-cancel-btn" style="padding: 8px 12px; cursor: pointer;">Avbryt</button>
          <button type="submit" style="padding: 8px 16px; cursor: pointer; background: #0076ff; color: #fff; border: none; border-radius: 4px;">Skicka</button>
        </div>
      </form>
    `;

    }





}