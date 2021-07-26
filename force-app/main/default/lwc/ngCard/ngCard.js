import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";


export default class NgCard extends NavigationMixin(LightningElement)  {
  @api studentId;
  @api firstName;
  @api lastName;
  @api schoolName;
  @api profilePictureUrl;

  openStudentPage() {
    this[NavigationMixin.GenerateUrl]({
      type: "standard__webPage",
      attributes: {
        url: "/s/students/student?id=" + this.studentId
      }
    }).then((generatedUrl) => {
      document.location = generatedUrl;
    });
  }
}