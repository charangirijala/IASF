import { LightningElement,wire } from "lwc";
import { NavigationContext, navigate } from 'lwr/navigation'
import ENVIRONMENT from '@eschweitzer78/env/ENVIRONMENT';
import SERVICES_URL_LOCAL from '@eschweitzer78/env/SERVICES_URL_LOCAL';
import SERVICES_URL_PROD from '@eschweitzer78/env/SERVICES_URL_PROD';
export default class Login extends LightningElement{
     @wire(NavigationContext)
     navContext;
     username;
     password;

     handleUsernameChange(event) {
          this.username = event.target.value;
     }
     handlePasswordChange(event) {
          this.password = event.target.value;
     }
     async handleLogin(event) {
          event.preventDefault();
          console.log('btn clicked');
          try {  
               const currentEnv = ENVIRONMENT;
               console.log('currentenv', currentEnv);
               let servicesURL="";
               if (currentEnv === 'Local') {
                    console.log('SERVICES_URL_LOCAL', SERVICES_URL_LOCAL);
                    servicesURL = SERVICES_URL_LOCAL || 'https://5z9i5tsznd.execute-api.ap-south-1.amazonaws.com/Local';
               } else if (currentEnv === 'Prod') {
                    servicesURL = SERVICES_URL_PROD
               }
               console.log('services url: ',servicesURL);
               const apiResponse = await fetch(`${servicesURL}/auth/login`, {
                    method: 'POST',
                    credentials:'include',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                         email: this.username,
                         password: this.password
                    })
               });

               if (apiResponse.status === 200) {
                    const data = await apiResponse.json();
                    console.log(data);
               } else if (apiResponse.status === 401) {
                    console.log('Invalid credentials');
               } else if (apiResponse.status === 400) {
                    const data = await apiResponse.json();
                    console.log('Response : 400 ',data);
               }
          } catch (error) {
               console.log('error occured while connecting to API', error);
          }
     }
}