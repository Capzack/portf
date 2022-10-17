import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";

export default function Activate(props){
  let { activate_id,  token} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/auth/users/activation/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        'uid': activate_id,
        'token': token,
      })
    })
    .then(res => res.ok ? navigate('/login') : alert('Ошибка'))
  },[])
}
