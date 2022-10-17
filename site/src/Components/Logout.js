import React, {useEffect} from 'react';
import  {useNavigate} from "react-router-dom";

export default function Logout(props){
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear()
    props.set_auth(false)
    navigate('/login');
  },[])
}
