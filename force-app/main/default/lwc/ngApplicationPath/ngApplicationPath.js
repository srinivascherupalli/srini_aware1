import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

const defaultStyleClass = "slds-path__item slds-is-incomplete"
const completedStyleClass = "slds-path__item slds-is-active"
const currentStyleClass = "slds-path__item slds-is-current"

export default class ngApplicationPath extends LightningElement {
  @api status;
  @api type;

  @api stages;
  @api currentStage;

  @api applicationStatusList = [];

  /*@api applicationStatusList = [
    {
      name: "Enquiry Submitted",
      styleClass: defaultStyleClass
    },
    {
      name: "School Review",
      styleClass: defaultStyleClass
    },
    {
      name: "Principal Approval",
      styleClass: defaultStyleClass
    },
    {
      name: "Place Offered",
      styleClass: defaultStyleClass
    },
    {
      name: "Offer Accepted",
      styleClass: defaultStyleClass
    },
    {
      name: "Processing Enrolment",
      styleClass: defaultStyleClass
    },
    {
      name: "Closed",
      styleClass: defaultStyleClass
    }
  ];

  @api exitApplicationStatusList = [
    {
      name: "Exit Requested",
      styleClass: defaultStyleClass
    },
    {
      name: "Exit School Review",
      styleClass: defaultStyleClass
    },
    {
      name: "Director Approval",
      styleClass: defaultStyleClass
    },
    {
      name: "Processing Exit",
      styleClass: defaultStyleClass
    },
    {
      name: "Exit Complete",
      styleClass: defaultStyleClass
    },
    {
      name: "Closed",
      styleClass: defaultStyleClass
    }
  ];

  @api transitionApplicationStatusList = [
    {
      name: "Enquiry Submitted",
      styleClass: defaultStyleClass
    },
    {
      name: "Enquiry School Review",
      styleClass: defaultStyleClass
    },
    {
      name: "Principal Approval",
      styleClass: defaultStyleClass
    },
    {
      name: "Place Offered",
      styleClass: defaultStyleClass
    },
    {
      name: "Offer Accepted",
      styleClass: defaultStyleClass
    },
    {
      name: "Processing Enrolment",
      styleClass: defaultStyleClass
    },
    {
      name: "Exit School Review",
      styleClass: defaultStyleClass
    },
    {
      name: "Processing Exit",
      styleClass: defaultStyleClass
    },
    {
      name: "Exit Complete",
      styleClass: defaultStyleClass
    },
    {
      name: "Enrolment Complete",
      styleClass: defaultStyleClass
    },
    {
      name: "Closed",
      styleClass: defaultStyleClass
    }
  ];*/

  get allApplicationStatusList() {

    var temp = [];
    var tempItem = {};
    if(this.stages) {

      for (var i = 0; i < this.stages.length; i++) {
        tempItem = {};
        tempItem.name = this.stages[i];
        tempItem.styleClass =  defaultStyleClass;
        temp.push(tempItem);
      }
    }
      

    if (this.currentStage) {
      for (var i = 0; i < temp.length; i++) {
        temp[i].styleClass = completedStyleClass;
        if (temp[i].name == this.currentStage) {
          temp[i].styleClass = currentStyleClass;
          return temp;
          break;
        }
      }
    }
    return temp;
}
}