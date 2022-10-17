import fetchIntercept from 'fetch-intercept';
import  {useNavigate} from "react-router-dom";

let actual_request

function refresh(base_response){
  return new Promise((resolve, reject) => {
    fetch('/auth/jwt/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'refresh': localStorage.getItem('refresh')
      })
    })
    .then(response => {
      if (!response.ok){
        window.location.pathname = '/logout'
        reject()
      }
      else
        response.json()
        .then(
          (result) => {
            localStorage.setItem('access', result.access)
            fetch(base_response)
            .then(res => resolve(res))
          }
        )
    });
  });
}


const unregister = fetchIntercept.register({
    request: function (url, config) {
      if (localStorage.getItem('access'))
        if (url instanceof Request){
          if (!without_auth.includes(url.url) && !url.url.match(...without_auth_params)){
            actual_request = url.clone()
            url.headers.set('Authorization', `JWT ${localStorage.getItem('access')}`)
          }
        }
        else {
          if (!without_auth.includes(url) && !url.match(...without_auth_params)){
            actual_request = new Request(url, config)
            config.headers.Authorization  = `JWT ${localStorage.getItem('access')}`
          }
        }
        return [url, config];
    },

    requestError: function (error) {
        console.log(error)
        return Promise.reject(error);
    },

    response: function (response) {
      if (response.status == 401 && window.location.pathname != '/login'){
        if(response.url.includes('auth/jwt/refresh/'))
          return(response)
        else
          return(refresh(actual_request))
      }
      else
        return response
    },

    responseError: function (error) {
        console.log(error)
        return Promise.reject(error);
    }
});
