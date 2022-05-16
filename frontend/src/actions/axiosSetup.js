// import axios from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';

// // Function that will be called to refresh authorization
// const refreshAuthLogic = failedRequest => axios.post('').then(tokenRefreshResponse => {
//     localStorage.setItem('token', tokenRefreshResponse.data.token);
//     failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
//     return Promise.resolve();
// });

// // Instantiate the interceptor
// createAuthRefreshInterceptor(axios, refreshAuthLogic);

// // Make a call. If it returns a 401 error, the refreshAuthLogic will be run, 
// // and the request retried with the new token
// axios.get('https://www.example.com/restricted/area')
//     .then(/* ... */)
//     .catch(/* ... */);