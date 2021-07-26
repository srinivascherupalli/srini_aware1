import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import getChildrenDetails from "@salesforce/apex/ngContactController.getChildDetailsByParentContactId";

export default class ngStudentList extends NavigationMixin(LightningElement) {
  //Navigate to visualforce page
  @track studentList;
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
    var parentId = new URL(window.location.href).searchParams.get("id");
    if (parentId != null) {
      getChildrenDetails({
        parentId: parentId
      })
        .then((result) => {
            if(result.length>0) {
                this.studentList = result;
            }
        })
        .catch((error) => {
          this.error = error;
        });
    } else {
      //redirect to error page
    }
  }
}