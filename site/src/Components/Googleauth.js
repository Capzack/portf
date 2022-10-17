import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";

export default function Googleauth(props){
  let details = {
    'state': new URLSearchParams(window.location.search).get('state'),
    'code': new URLSearchParams(window.location.search).get('code')
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  useEffect(() => {
    fetch('/auth/social/o/google-oauth2/', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: formBody
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(result=>{
          if ('access' in result){
            localStorage.setItem('access', result.access)
            localStorage.setItem('refresh', result.refresh)
            fetch('/auth/users/me/', {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'GET',
            })
            .then(res=>res.json())
            .then((result)=> {
              localStorage.setItem('username', result.nickname)
              localStorage.setItem('profile_picture', result.profile_picture)
              props.set_auth(true)
            })
            .then(()=>navigate('/account', { replace: true }))
          }
          else
            set_err_text(result.detail)
          })
        }
      else
       alert('Данная почта уже зарегистированна')})
  },[])
}
