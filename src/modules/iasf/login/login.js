import { LightningElement,wire } from "lwc";
import { NavigationContext, navigate } from 'lwr/navigation'
import ENVIRONMENT from '@eschweitzer78/env/ENVIRONMENT';
import SERVICES_URL_LOCAL from '@eschweitzer78/env/SERVICES_URL_LOCAL';
import SERVICES_URL_PROD from '@eschweitzer78/env/SERVICES_URL_PROD';
export default class Login extends LightningElement{
     @wire(NavigationContext)
     navContext;
     username="";
     password="";
     helptext = "";
     isLoading = false;


     handleUsernameChange(event) {
          this.username = event.target.value;
          this.helptext = "";
     }
     handlePasswordChange(event) {
          this.password = event.target.value;
          this.helptext = "";
     }

     async handleForgotPassword() {
          // console.log('Forgot password clicked');
          if (this.username.trim().length === 0) {
               this.helptext = "Please enter username";
               return;
          }
          try {
               this.helptext = "";
               this.isLoading = true;
               const currentEnv = ENVIRONMENT;
               console.log('currentenv', currentEnv);
               let servicesURL = "";
               if (currentEnv === 'Local') {
                    console.log('SERVICES_URL_LOCAL', SERVICES_URL_LOCAL);
                    servicesURL = SERVICES_URL_LOCAL
               } else if (currentEnv === 'Prod') {
                    servicesURL = SERVICES_URL_PROD
               }
               const apiResponse = await fetch(`${servicesURL}/auth/forgotpassword`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                         email: this.username
                    })
               });
               if (apiResponse.status === 200) {
                    const data = await apiResponse.json();
                    this.isLoading = false;
                    console.log(data);
               } else if (apiResponse.status === 404) {
                    console.log('Invalid credentials');
                    this.isLoading = false;
                    this.helptext = "The credentials you entered are incorrect. Please verify your username, then try again.";
                    this.resetFormValues();
               } else {
                    this.isLoading = false;
                    const data = await apiResponse.json();
                    console.log('Response : 500 ',data);
               }
          } catch (error) {
               this.isLoading = false;
               console.log('error occured while connecting to API', error);
          }
     }
     async handleLogin(event) {
          let inputValidated = true;
          event.preventDefault();
          // console.log('btn clicked');
          if (this.username.trim().length === 0 || this.password.trim().length === 0) {
               this.helptext = "Username and password are required";
               inputValidated = false;
          }
          if (inputValidated) {
               try {  
                    this.helptext = "";
                    this.isLoading = true;
                    const currentEnv = ENVIRONMENT;
                    console.log('currentenv', currentEnv);
                    let servicesURL="";
                    if (currentEnv === 'Local') {
                         console.log('SERVICES_URL_LOCAL', SERVICES_URL_LOCAL);
                         servicesURL = SERVICES_URL_LOCAL 
                    } else if (currentEnv === 'Prod') {
                         servicesURL = SERVICES_URL_PROD
                    }
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
                         this.isLoading = false;
                         console.log(data);
                         window.location.href="/"
                    } else if (apiResponse.status === 401) {
                         console.log('Invalid credentials');
                         this.isLoading = false;
                         this.helptext = "The credentials you entered are incorrect. Please verify your username and password, then try again.";
                         this.resetFormValues();
                    } else if (apiResponse.status === 400) {
                         this.isLoading = false;
                         const data = await apiResponse.json();
                         console.log('Response : 400 ',data);
                    }
               } catch (error) {
                    console.log('error occured while connecting to API', error);
               }
          }
     }

     resetFormValues() {
          this.template.querySelectorAll('lightning-input').forEach((input) => {
               input.value = "";
          })
          this.username = "";
          this.password = "";
     }
}