import { LightningElement, api } from 'lwc';

export default class NgButton extends LightningElement {
  @api imgClass
  @api imgUrl

  get imgStyle() {
    return `background-image:url('${this.imgUrl}')`
  }
}