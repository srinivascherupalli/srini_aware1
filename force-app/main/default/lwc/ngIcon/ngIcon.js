import { LightningElement, api } from "lwc";

export default class NgIcon extends LightningElement {
  @api name;
  @api size;
  @api type;
  @api color;

  get iconClass() {
    return `slds-icon slds-icon_${this.size}`;
  }

  get iconStyle() {
    return `fill:${this.color}`;
  }

  get iconLink () {
    return `/_slds/icons/${this.type}-sprite/svg/symbols.svg#${this.name}`;
  }
}