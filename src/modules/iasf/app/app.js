import { LightningElement } from 'lwc';
import { createRouter } from 'lwr/router'
// import { isAuthenticated } from 'utils/auth';
const routerConfig = {
     routes: [
       {
         id: 'home',
         uri: '/',
         handler: () => import('iasf/accountsearch'),
           page: {
               type: 'home',
           },
       },
       {
           id: 'login',
           uri: '/login',
           handler: () => import('iasf/login'),
           page: {
               type: 'login',
           },
       },
     ],
     basePath: '/my-site',
     i18n: {
       locale: 'es',
       defaultLocale: 'en-US'
     },
     caseSensitive: true
   }
export default class App extends LightningElement {
    connectedCallback() {
      const cookies = document.cookie.split(';');
     const accessToken = cookies.find((cookie) => {
          cookie.trim().startsWith('access_token=');
     })

     if (!accessToken) {
          window.location.href = '/login';
     }
     
    }
     router = createRouter({ routerConfig });

     homeReference = { type: 'login' };
}
