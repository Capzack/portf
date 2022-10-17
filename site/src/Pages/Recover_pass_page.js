import React, {useState} from 'react';
import {Title, Input, Text, Checkbox, Red_text, Submit_button} from '../styled/components.js'
import Google from '../media/images/google.svg'
import Appl from '../media/images/Appl.svg'
import Vk from '../media/images/vk.svg'


export default function Login_page(props){
  let [email, set_email] = useState('')
  let [isRead, setisRead] = useState(false)
  let [errText, setErrText] = useState()


  function submit(e){
    if (!email){
      setErrText('Не заполнено обязательное поле')
      setisRead(true)
    }
    else{
      fetch('/auth/users/reset_password/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'email': email,
        })
      })
      .then(res => {
        if (res.ok){
          setisRead(false)
          setErrText('Письмо отправленно на почту')
        }
        else
          res.json()
          .then((result)=>{
            setisRead(true)
            setErrText(result.email)
          })
      })
    }
  }


  return (
    <div className='container'>
      <div className='row mx-1 ms-sm-0'>
        <div className='col-0 col-lg-1'/>
        <div className ='col-12 col-lg-11'>
          <div className='row justify-content-between'>
          <Title mb='20px'>
            Восстановление аккаунта
          </Title>
          <div className='col-10 col-sm-8 col-md-6 col-md-5'>
            <div className='row gy-3'>
              <Text fz='20px' className='mb-5'>Введите email на который зарегистрирован аккаунт</Text>
              <Input value={email} onChange={e=>{set_email(e.target.value)}} className = 'col-12 col-lg-10' placeholder ='email'/>
              <div className='col-12 col-lg-10 p-0 mb-4 d-flex align-items-center justify-content-between'>
              </div>
              <Submit_button onClick={e=>submit(e)} className='p-2 col-12 col-lg-4'>Продолжить</Submit_button>
              <Red_text is_read={isRead}>{errText}</Red_text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
