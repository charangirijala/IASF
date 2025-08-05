import { LightningElement,api } from "lwc";

export default class Libox extends LightningElement{
     @api title;
     @api value;
     @api position;

     get derivedClass(){
          if (this.position === 'left') return "slds-box slds-var-m-right_small";
          else if (this.position === 'right') return "slds-box slds-var-m-left_small"
          else if (this.position === 'middle') return "slds-box slds-var-m-small";
     }
}