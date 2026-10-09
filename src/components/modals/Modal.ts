import { formViews } from "./modalTemplates.ts";
export class Modal {
    // static used here to ensure there is only ever one Modal open / saved in memory
    private static instance: Modal;
    private dialog: HTMLDialogElement;
    private activeView: keyof typeof formViews | null = null;


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

    }





}