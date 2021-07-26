import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import getContactDetails from "@salesforce/apex/ngContactController.getContactDetailsById";
import getAccountDetails from "@salesforce/apex/ngContactController.getAccountDetailsById";

export default class ngStudentProfileCard extends LightningElement {
  @api contactList;
  @api accountList;

  connectedCallback() {
    var contactId = new URL(window.location.href).searchParams.get("id");
    if (contactId != null) {
      getContactDetails({
        contactId: contactId
      })
        .then((result) => {
          if (result.length > 0) {
            this.contactList = result;
          }
        })
        .catch((error) => {
          this.error = error;
        });

        getAccountDetails({
          contactId: contactId
        })
          .then((result) => {
            if (result.length > 0) {
              this.accountList = result;
            }
          })
          .catch((error) => {
            this.error = error;
          });
    } else {
      //redirect to error page
    }
  }


  get schoolPrincipalEmail() {
    var temp = '';
    if(this.contactList.length>0) {
      if(this.contactList[0].Current_School_Admin_Email__c) {
        temp = 'mailto:'+this.contactList[0].Current_School_Principal_Email__c;
      }
    }
    return temp;
  }

  get schoolAdminEmail() {
    var temp = '';
    if(this.contactList.length>0) {
      if(this.contactList[0].Current_School_Admin_Email__c) {
        temp = 'mailto:'+this.contactList[0].Current_School_Admin_Email__c;
      }
    }
    return temp;
  }
}