import { LightningElement } from "lwc";

export default class Accountsearch extends LightningElement {
  accountInputString = "";
  handleAccountSearch() {
    console.log("Button CLicked",this.accountInputString);
  }
     handleAccountInput(event) {
          console.log('event: ', event.target.value);
          this.accountInputString = event.target.value;
  }
}
