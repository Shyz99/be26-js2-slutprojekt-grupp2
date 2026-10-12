import { formViews } from "./modalTemplates.ts";
import type { formConfigurations } from "./modalTemplates.ts";
import { dynamicPostCheck } from "../../firebase/dynamicPostCheck.ts";

export class Modal {
    // static used here to ensure there is only ever one Modal open / saved in memory
    private static instance: Modal;
    private dialog: HTMLDialogElement;
    private activeView: formConfigurations | null = null;
    private potentialTaskID: string | null = null;

    private constructor() {
        this.dialog = document.createElement('dialog');
        document.body.appendChild(this.dialog);
        // TODO CSS styles

        // makes sure the user can click outside the box to close
        // TODO: a X to close? 
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
    // for us all to use like this: 
    // const testBtn = document.createElement('button'); 
    // testBtn.innerText = "test av modal"; 
    // const testModal = Modal.getInstance(); 
    // testModal.trigger(testBtn, 'test'); 
    // document.body.appendChild(testBtn);
    // TODO remove comments lol 
    public static getInstance(): Modal {
        if (!Modal.instance) {
            Modal.instance = new Modal();
        }
        return Modal.instance;
    }

    public trigger(element: HTMLElement, formType: string, potentialTaskID?: string) {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            this.open(formType, potentialTaskID);
        });
    }

    public open(formID: string, potentialTaskID?: string) {
        const configForm = formViews[formID];

        if (!configForm) {
            console.log("ID finns inte bland våra formViews")
            return;
        }
        this.activeView = configForm;
        this.potentialTaskID = potentialTaskID || null;
        this.renderFormView();
        this.dialog.showModal();

    }
    private renderFormView() {
        if (!this.activeView) {
            return;
        }
        let hiddenInput = "";
        if (this.potentialTaskID !== null) {
            hiddenInput = `<input type="hidden" name="taskID" value="${this.potentialTaskID}">`
        }
        else {
            hiddenInput = ""; 
        }
        // creating the form 
        this.dialog.innerHTML = `
            <h3 style="margin: 0 0 16px 0;">${this.activeView.modalTitle}</h3>
            <form id="modal-form">
                ${hiddenInput}
                ${this.activeView.HTMLElements}
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" id="modal-cancel-btn" style="padding: 8px 12px; cursor: pointer;">Avbryt</button>
                    <button type="submit" style="padding: 8px 16px; cursor: pointer; background: #ff3300ae; color: #fff; border: none; border-radius: 4px;">Skicka</button>
                </div>
            </form>
        `;

        this.dialog.querySelector('#modal-cancel-btn')?.addEventListener('click', () => this.close());
        this.dialog.querySelector('#modal-form')?.addEventListener('submit', (event) => this.submitEvent(event));

    }

    private async submitEvent(event: Event) {
        event.preventDefault();

        if (!this.activeView) return;

        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const postObj = Object.fromEntries(formData.entries());

        this.dialog.innerHTML = '<p style="text-align: center;">Laddar...</p>';

        const postSuccess = await dynamicPostCheck(postObj, this.activeView.URLEndPoint);
        if (postSuccess) {
            this.renderStatus(true);
        }
        else {
            this.renderStatus(false);
        }


    }
    private renderStatus(isSuccess: boolean) {
        if (isSuccess) {
            this.dialog.innerHTML = '<p>Lyckades posta!</p>'
        }
        else {
            this.dialog.innerHTML = '<p>Lyckades inte posta!</p>'
        }
    }

    public close() {
        this.dialog.close();
        this.activeView = null;
    }


}