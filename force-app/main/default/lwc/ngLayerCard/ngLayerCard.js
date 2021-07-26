import { LightningElement, api } from 'lwc';

export default class ngLayerCard extends LightningElement {
  @api title
  @api description
  @api imgURL
  @api linkURL
}