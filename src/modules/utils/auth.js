export default function isAuthenticated() {
     const cookies = document.cookie.split(';');
     const accessToken = cookies.find((cookie) => {
          cookie.trim().startsWith('access_token=');
     })

     if (!accessToken) {
          window.location.href = '/login';
          return false;
     }
     return true;
}