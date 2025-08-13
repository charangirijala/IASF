import ENVIRONMENT from '@eschweitzer78/env/ENVIRONMENT';
import SERVICES_URL_LOCAL from '@eschweitzer78/env/SERVICES_URL_LOCAL';
import SERVICES_URL_PROD from '@eschweitzer78/env/SERVICES_URL_PROD';

export async function AuthenticationService() {
     try {
          const currentEnv = ENVIRONMENT;
     console.log('currentenv', currentEnv);
     let servicesURL="";
     if (currentEnv === 'Local') {
          console.log('SERVICES_URL_LOCAL', SERVICES_URL_LOCAL);
          servicesURL = SERVICES_URL_LOCAL 
     } else if (currentEnv === 'Prod') {
          servicesURL = SERVICES_URL_PROD
     }                   
     const apiResponse = await fetch(`${servicesURL}/auth/verifytoken`, {
          method: 'GET',
          credentials: 'include'
     });  
      if (apiResponse.status === 200) {
          const { user } = await apiResponse.json();
          return {
               isAuthenticated: true,
               user
          }
      } else {
           return {
                isAuthenticated: false,
                user: {}
           }
     }
     } catch (error) {
          console.error('Auth check failed:', error);
          return {
               isAuthenticated: false,
               user: {}
          }
     }
     
}