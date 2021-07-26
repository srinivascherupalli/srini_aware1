import { LightningElement, track, api, wire } from "lwc";

export default class accCustomNavigation extends LightningElement {

    @api heading;
    @api description;
}