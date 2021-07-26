import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import USER_ID from "@salesforce/user/Id";
import CONTACT_ID from "@salesforce/schema/User.ContactId";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import getUserContactDetails from "@salesforce/apex/ngContactController.getParentContactDetailsByUserId";

export default class ngUrlRedirect extends NavigationMixin(LightningElement) {
  //Navigate to visualforce page
  navigateToCustomPage(parentId) {
    this[NavigationMixin.GenerateUrl]({
      type: "standard__webPage",
      attributes: {
        url: "/s/home?id=" + parentId
      }
    }).then((generatedUrl) => {
      document.location = generatedUrl;
    });
  }

  connectedCallback() {
    getUserContactDetails({
      userId: USER_ID
    })
      .then((result) => {
        var id = new URL(window.location.href).searchParams.get("id");
        if (id == null) {
          this.navigateToCustomPage(result[0].ContactId);
        }
      })
      .catch((error) => {
        this[NavigationMixin.GenerateUrl]({
          type: "standard__webPage",
          attributes: {
            url: "/s/error"
          }
        }).then((generatedUrl) => {
          document.location = generatedUrl;
        });
      });
  }
}