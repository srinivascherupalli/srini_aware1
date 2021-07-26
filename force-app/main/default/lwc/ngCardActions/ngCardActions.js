import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";

export default class ngCardActions extends LightningElement {
    @api studentId;
    @api showViewStudentLink;
    @api applicationId;

    showConfirm = '';
    isOpen = false;
    @track temp = false;
    sldsClass = 'slds-dropdown-trigger slds-dropdown-trigger_click';

    toggleSwitch(event){
        this.isOpen = !this.isOpen;

        if(this.isOpen == false) {
            this.sldsClass = 'slds-dropdown-trigger slds-dropdown-trigger_click';
        } else {
            this.sldsClass = 'slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
        }
    }

    get viewStudentLink() {
        if(this.studentId && this.studentId!='null') {
            return '/s/students/student?id='+this.studentId
        } else {
            return ''
        }
    }

    get editStudentLink() {
        var id = new URL(window.location.href).searchParams.get("id");
        if(id) {
            return '/s/contact/'+id
        } else {
            return ''
        }
    }

    get exitApplicationLink() {
        var id = new URL(window.location.href).searchParams.get("id");
        if(this.studentId) {
            return '/s/applications/new-application?type=exit&id='+this.studentId
        } else {
            return ''
        }
    }

    openModal(event) {
        this.showConfirm = 'true';
    }

    doCancelApplication(event) {
        this.sldsClass = 'slds-dropdown-trigger slds-dropdown-trigger_click';
        this.showConfirm = '';
        if(event.detail == 'cancel') {
            this.showConfirm = '';
        } else {
            this.showConfirm = '';
            const custEvent = new CustomEvent(
                'cancelapplication', {
                    detail: event.detail,
                    bubbles: true, 
                    composed : false 
                });
            this.dispatchEvent(custEvent);
        }
    }

    handleDialogClick(event) {
        this.doCancelApplication(event);
    }

    
}