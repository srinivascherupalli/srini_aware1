import { LightningElement, api } from 'lwc';

export default class quickLink extends LightningElement {
  @api label
  @api link
  @api linkStyle

  get linkClass() {
    return `text-link ${this.linkStyle}`
  }
}