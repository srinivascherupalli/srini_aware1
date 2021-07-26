import { LightningElement, api } from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';

export default class quickLinkList extends LightningElement {
  @api links
  @api linksTitle
}