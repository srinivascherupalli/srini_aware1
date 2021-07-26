import { LightningElement, api } from 'lwc';

export default class AddressFinderCmp extends LightningElement {
    @api styleClass;
    @api label;
    @api streetLabel;
    @api cityLabel;
    @api countryLabel;
    @api provinceLabel;
    @api postCodeLabel;
    @api streetValue;
    @api cityValue;
    @api countryValue;
    @api provinceValue;
    @api postCodeValue;
    @api required;
    @api lookupPlaceholder;

    handleChange(event){
        console.log("address = "+JSON.stringify(event.detail));
        this.streetValue = event.detail.street;
        this.cityValue = event.detail.city;
        this.postCodeValue = event.detail.postalCode;
        this.provinceValue = event.detail.province;
        this.countryValue = event.detail.country;
    }
}