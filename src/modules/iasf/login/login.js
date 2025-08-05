import { LightningElement,wire } from "lwc";
import { NavigationContext,navigate } from 'lwr/navigation'
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
               const apiResponse = await fetch('https://5z9i5tsznd.execute-api.ap-south-1.amazonaws.com/Prod/auth/login', {
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