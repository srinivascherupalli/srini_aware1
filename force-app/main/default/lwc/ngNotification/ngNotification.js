import { LightningElement, api } from 'lwc';

export default class ngNotification extends LightningElement {
  @api status;
  

  get isShow() {
    if(this.status == 'Place Offered') {
      return true;
    }
  }

  get actionUrl() {
    var id = new URL(window.location.href).searchParams.get("id");
    if(id) {
      return '/s/applications/new-application?id='+id;
    }else {
      return '';
    }
  }
}