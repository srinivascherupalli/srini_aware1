import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import getApplicationDetails from "@salesforce/apex/ngContactController.getApplicationDetailsByParentId";

const columns = [
  {
    label: "Application",
    fieldName: "Application_URL__c",
    type: "url",
    typeAttributes: { label: { fieldName: "Name" } },
    sortable: true
  },
  {
    label: "Student",
    fieldName: "DET_Student_Name__c",
    type: "text"
  },
  { label: "School", fieldName: "Applying_To_School_Name__c", type: "text" },
  { label: "Type", fieldName: "hed__Application_Type__c", type: "text" },
  {
    label: "Status",
    fieldName: "hed__Application_Status__c",
    type: "text"
  },
  { label: "Last Modified", fieldName: "LastModifiedDate", type: "text" }
];

export default class NgApplications extends LightningElement {
  @api applicationsList = [];
  columns = columns;

  // eslint-disable-next-line @lwc/lwc/no-async-await
  async connectedCallback() {
    var contactId = new URL(window.location.href).searchParams.get("id");
    getApplicationDetails({
      contactId: contactId
    })
      .then((result) => {
        if (result.length > 0) {
          this.applicationsList = result;
          console.log(this.applicationsList);
        }
      })
      .catch((error) => {
        this.error = error;
      });
  }
}