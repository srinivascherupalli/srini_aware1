import { LightningElement, api } from 'lwc';

export default class ngCollapseSection extends LightningElement {
    @api title;
    @api heading;
    @api content;
    @api address;
    @api phone;
    @api label1;
    @api value1;
    @api label2;
    @api value2;
    @api label3;
    @api value3;
    @api label4;
    @api value4;

    isOpen = false;
    iconClass = 'chevrondown';
    divClass = 'hideDiv';
    toggleSwitch(event){
        this.isOpen = !this.isOpen;
        if(this.isOpen == false) {
            this.divClass = 'hideDiv';
            this.iconClass = 'chevrondown';
        } else {
            this.divClass = 'showDiv';
            this.iconClass = 'chevronup';
        }
    }
}