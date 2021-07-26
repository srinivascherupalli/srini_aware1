import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import getApplicationDetails from "@salesforce/apex/ngContactController.getApplicationDetailsById";
import doCancelApplication from "@salesforce/apex/ngContactController.cancelApplicationById";

export default class NgStudentApplication extends NavigationMixin(LightningElement) {
  @api applicationList = [];
  @api applicationId;

  connectedCallback() {
    var applicationId = new URL(window.location.href).searchParams.get("id");
    this.applicationId = applicationId;
    getApplicationDetails({
      applicationId: applicationId
    })
      .then((result) => {
        if (result.length > 0) {
          this.applicationList = result;
        }
      })
      .catch((error) => {
        this.error = error;
      });
  }

  cancelApplication(event) {
    doCancelApplication({
      applicationId: this.applicationId
    })
      .then((result) => {
        var pageURL = '/s/applications/application?id='+this.applicationId;
        this[NavigationMixin.GenerateUrl]({
          type: "standard__webPage",
          attributes: {
            url: pageURL
          }
        }).then((generatedUrl) => {
          document.location = generatedUrl;
        });
      })
      .catch((error) => {
        this.error = error;
        console.log(error);
      });
  }
}