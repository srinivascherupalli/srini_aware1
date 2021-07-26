import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import getUserContactDetails from "@salesforce/apex/ngContactController.getParentContactDetailsByUserId";


export default class ngUrlRedirect extends NavigationMixin(LightningElement) {
  @api recordId;

  //Navigate to visualforce page
  navigateToCustomPage(id, pageURL) {
    this[NavigationMixin.GenerateUrl]({
      type: "standard__webPage",
      attributes: {
        url: pageURL
      }
    }).then((generatedUrl) => {
      document.location = generatedUrl;
    });
  }

  connectedCallback() {
    var id = new URL(window.location.href).searchParams.get("id");
    var pageURL = window.location.href;
    var pageURLSplit = pageURL.split('/');
    var tempId = pageURLSplit[pageURLSplit.length-1];

    if (tempId && tempId!=null){
      var temp = tempId.substring(0,3);
      if(temp == 'a1H') {
        this.navigateToCustomPage(tempId, '/s/applications/application?id='+tempId);
      } else if(temp == '003') {
        this.navigateToCustomPage(tempId, '/s/students/student?id='+tempId);
      } else if(temp == '005') {
        getUserContactDetails({
          userId: tempId
        })
          .then((result) => {
            if(result[0].ContactId) {
              this.navigateToCustomPage(tempId, '/s/contact/'+result[0].ContactId);
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
      else {
        //Don't redirect
      }
    }
  }
}