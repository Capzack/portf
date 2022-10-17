import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import {Grey_text, Input, Red_text, Submit_button} from '../styled/components.js'

export default function Confirm_pass_reset(props){
  let {activate_id, token} = useParams()
  let [pass, setPass] = useState('')
  let [repass, setRepass] = useState('')
  let [isRead, setIsRead] = useState(false)
  let [errText, setErrText] = useState()

  function submit(e){
    if (!repass || !pass){
      setErrText('Не заполненно обязательное поле')
      setIsRead(true)
    }
    else if(pass != repass){
      setErrText('Пароли не совпадают')
      setIsRead(true)
    }
    else
      fetch('/auth/users/reset_password_confirm/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'uid': activate_id,
          'token': token,
          "new_password": pass,
          "re_new_password": repass
        })
      })
      .then(res => {
        if (res.ok){
          setErrText('Пароль изменен')
          setIsRead(false)
        }
        else{
          res.json()
          .then(result=>{
            setErrText(...result.new_password)
            setIsRead(true)
          })
        }
      })
    }

    return (
      <div className='container'>
        <div className='row mx-1 ms-sm-0'>
          <div className='col-0 col-lg-1'/>
          <div className ='col-12 col-md-6'>
            <div className='row'>
              <Grey_text className=''>
                Новый пароль
              </Grey_text>
              <Input value={pass} onChange={e=>setPass(e.target.value)} className='col-10 col-lg-7 p-2 mt-2' placeholder='Новый пароль' type='password'/>
              <Input value={repass} onChange={e=>setRepass(e.target.value)} className='col-10 col-lg-7 p-2 mt-3' placeholder='Повторите пароль' type='password'/>
              <div className='col-12'/>
              <Submit_button onClick={e=>submit(e)} className='col-8 col-lg-5 p-2 mt-4 '>Продолжить</Submit_button>
              <Red_text is_read={isRead}>{errText}</Red_text>
            </div>
          </div>
        </div>
      </div>
    )
}
