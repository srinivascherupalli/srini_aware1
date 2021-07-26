import { LightningElement,  api, track } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';


export default class FormSectionHeaderCmp extends LightningElement {
    //If the screen is open.
    @track open = true;

    @api get isOpen() {
        return this.open;
    }

    set isOpen(isOpen) {
        this.open = isOpen;
    }

    //The name of the section.  This is displayed in the title and also used
    //to tie the section to the contents of the section
    //In the flow, create a variable to hold this.
    @api sectionName = '';

    //The name of the screen to navigate to if Edit is pressed.
    //Currently not functioning.  For display only.
    //If left blank, this will hide the button.
    @api editScreen = '';


    get hasEditScreen() {
        //TODO use whatever javascript method is best to determine if editScreen is null or blank or undefined...
        //Note that this will also return false is string value is 'false' or 0 etc -- does that matter?
        return Boolean(this.editScreen);
    }

    handleSectionOpen(event) {
        this.open = true;
        this.dispatchChangeEvent();
    }

    handleSectionClose(event) {
        this.open = false;
        this.dispatchChangeEvent();
    }

    dispatchChangeEvent() {
        const attributeChangeEvent = new FlowAttributeChangeEvent('isOpen', this.open);
        this.dispatchEvent(attributeChangeEvent);
    }
}