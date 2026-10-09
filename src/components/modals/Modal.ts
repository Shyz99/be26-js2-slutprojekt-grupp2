import { formViews } from "./modalTemplates.ts";
import type { formConfigurations } from "./modalTemplates.ts";
import { posts } from "../../firebase/dynamicPostCheck.ts";

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
    private renderFormView(): void {
        if(!this.activeView){
            return;
        }

        this.dialog.innerHTML = `
      <h3 style="margin: 0 0 16px 0;">${this.activeView.title}</h3>
      <form id="modal-form">
        ${this.activeView.postForm}
        <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
          <button type="button" id="modal-cancel-btn" style="padding: 8px 12px; cursor: pointer;">Avbryt</button>
          <button type="submit" style="padding: 8px 16px; cursor: pointer; background: #0076ff; color: #fff; border: none; border-radius: 4px;">Skicka</button>
        </div>
      </form>
    `;

    this.dialog.querySelector('#modal-cancel-btn')?.addEventListener('click', () => this.close());
    this.dialog.querySelector('#modal-form')?.addEventListener('submit', (event) => this.submitEvent(event));
    
    }

    private async submitEvent(event: Event): Promise<void> {
        event.preventDefault(); 

        if(!this.activeView) return; 

        const formElement = event.target as HTMLFormElement; 
        const formData = new FormData(formElement); 
        const postObj = Object.fromEntries(formData.entries());

        this.dialog.innerHTML = '<p style="text-align: center;">Laddar...</p>';

        const postSuccess = await posts(postObj, this.activeView.postForm); 
        this.renderStatus(postSuccess);
        
    }
    private renderStatus(isSuccess:boolean): void {
        if(isSuccess){
            this.dialog.innerHTML = '<p>Lyckades posta!</p>'
        }
        else{
            this.dialog.innerHTML = '<p>Lyckades inte posta!</p>'
        }
    }

    public close(): void {
        this.dialog.close(); 
        this.activeView = null; 
    }









}