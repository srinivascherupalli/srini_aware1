import { LightningElement, api } from 'lwc';

export default class ngConfirmationDialog extends LightningElement {
    @api visible; //used to hide/show dialog
    @api title; //modal title
    @api name; //reference name of the component
    @api message; //modal message
    @api confirmLabel; //confirm button label
    @api cancelLabel; //cancel button label
    @api originalMessage; //any event/message/detail to be published back to the parent component

    //handles button clicks
    handleClick(event) {
        //creates object which will be published to the parent component
        if (event.target) {
            //dispatch a 'click' event so the parent component can handle it
            this.dispatchEvent(new CustomEvent('dialogclick', { detail: event.target.name }));
        }
    }
}