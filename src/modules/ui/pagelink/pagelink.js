import { LightningElement, api, track, wire } from "lwc";
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';

export default class Pagelink extends LightningElement {
  @api label;
  @api pageReference;
  @track path;
  navContext;

  @wire(NavigationContext)
  wiredNavContext({ error, data }) {
    if (data) {
      this.navContext = data;
      this.updatePath();
    } else if (error) {
      console.error('NavigationContext error:', error);
    }
  }

  async updatePath() {
    if (this.pageReference && this.navContext) {
      try {
        this.path = await generateUrl(this.navContext, this.pageReference);
        console.log('Generated path:', this.path);
      } catch (err) {
        console.error('generateUrl error:', err);
      }
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (this.pageReference && this.navContext) {
      navigate(this.navContext, this.pageReference);
    }
  }
}