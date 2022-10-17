import React, {useState} from 'react';
import {Title, Input, Red_text, Submit_button, Bg_svg, Grey_text} from '../styled/components.js'
import Gear from '../media/images/Gear.svg'

export default function Changeemail(props){
  let [email, setEmail] = useState('')
  let [pass, setPass] =  useState('')
  let [err_text, setErr_text] =  useState('')
  let [is_read, set_is_read] = useState(true)

  function submit(e){
    if (!pass || !email){
      setErr_text('Не заполненно обязательное поле')
      set_is_read(true)
    }
    else{
      e.target.disabled = true
      fetch('/auth/users/set_email/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "current_password": pass,
            "new_email": email,
          })
      })
      .then(res => {
        if(res.ok){
          setErr_text('Почта изменена')
          set_is_read(false)
          e.target.disabled = false
        }
        else
          res.json()
          .then(result =>{
            setErr_text(result[Object.keys(result)[0]])
            set_is_read(true)
            e.target.disabled = false
          })
      })
    }
  }

  return (
    <div className='container'>
      <Bg_svg className='col-3' src={Gear} />
      <div className='row mx-1 ms-sm-0'>
        <div className='col-0 col-lg-1'/>
        <div className ='col-12 col-lg-11'>
          <div className='row'>
            <Title mb='20px'>
                Изменить почту
            </Title>
            <div className='col-12 col-md-6 p-0'>
              <Grey_text className=''>
                Введите старый пароль
              </Grey_text>
              <Input value={pass} onChange={e=>setPass(e.target.value)} className='col-10 col-lg-6 p-2  mt-2' placeholder='Пароль' type='password'/>
              <Red_text is_read={is_read}>{err_text}</Red_text>
            </div>
            <div className='col-12 col-md-6 p-0'>
              <Grey_text className=''>
                Введите новую почту чтобы продолжить
              </Grey_text>
              <Input value={email} onChange={e=>setEmail(e.target.value)} className='col-10 col-lg-7 p-2 mt-3' placeholder='Email' type='email'/>
              <div className='col-12'/>
              <Submit_button onClick={e=>submit(e)} className='col-8 col-lg-5 p-2 mt-4 '>Продолжить</Submit_button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
