import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Title, Input, Text, Checkbox, Red_text, Shadow_block, Theme_shadow_btn, Submit_button, Link} from '../styled/components.js'
import Google from '../media/images/google.svg'
import Appl from '../media/images/Appl.svg'
import Vk from '../media/images/vk.svg'


export default function Login_page(props){
  let [email, set_email] = useState('')
  let [password, set_password] = useState('')
  let [err_text, set_err_text] = useState()
  const navigate = useNavigate();

  function submit(e){
    if (!email || !password)
      set_err_text('Не заполнено обязательное поле')
    else{
      fetch('auth/jwt/create/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'email': email,
          'password': password,
        })
      })
      .then(res => res.json())
      .then((result) => {

        if ('access' in result){
          set_err_text('')
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
        },
        (error) => {
          console.log(error)
          set_err_text('Ошибка')
        }
      )
    }
  }

  function googleauth(e){
    fetch('/auth/social/o/google-oauth2/?redirect_uri=http://127.0.0.1:8000/googleauth', {
      headers: {}
    })
    .then(res => res.json())
    .then((result) =>  window.open(result.authorization_url))
  }

  return (
    <div className='container'>
      <div className='row mx-1 ms-sm-0'>
        <div className='col-0 col-lg-1'/>
        <div className ='col-12 col-lg-11'>
          <div className='row gy-3 justify-content-between'>
          <Title mb='20px'>
            Войти в Quantity&nbsp;ID
          </Title>
          <div className='col-10 col-sm-6 col-md-5 mb-3'>
            <div className='row gy-3'>
              <Text fz='20px' className='mb-5'>Логин и пароль</Text>
              <Input value={email} onChange={e=>{set_email(e.target.value)}} className = 'col-12 col-lg-10' placeholder ='email'/>
              <Input value={password} onChange={e=>{set_password(e.target.value)}} className = 'col-12 col-lg-10' type="password" />
              <div className='col-12 col-lg-10 p-0 mb-4 d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <Checkbox className='d-inline me-2' type='checkbox'/>
                  <Text className='align-middle d-inline m-0'>Запомнить меня</Text>
                </div>
                <a href='/recover' className='col-5 text-decoration-none d-flex align-items-center'>
                  <Text className='d-inline align-middle text-start m-0'>Забыли пароль?</Text>
                </a>
              </div>
              <Submit_button onClick={e=>submit(e)} className='p-2 col-12 col-lg-4'>Продолжить</Submit_button>
              <Red_text is_read={true}>{err_text}</Red_text>
            </div>
          </div>
          <div className='col-12 col-sm-5 m-0 p-0'>
            <div className='row m-0 mb-5 align-items-center'>
              <Text fz='20px' className='col-6 col-sm-12 mb-sm-3'>Или через</Text>
              <Theme_shadow_btn style={{'height': '56px', 'width': '56px'}} onClick={(e)=> {googleauth(e)}} className='p-2'>
                <img src={Google}/>
              </Theme_shadow_btn>
            </div>
            <a href='/regisration' className='text-decoration-none'>
              <Text className='fw-bold'>Зарегестрироваться</Text>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
