import React, {useState} from 'react';
import {Title, Input, Text, Checkbox, Red_text, Shadow_block, Submit_button} from '../styled/components.js'
import Google from '../media/images/google.svg'
import Appl from '../media/images/Appl.svg'
import Vk from '../media/images/vk.svg'


export default function Register_page(props){
  let [email, set_email] = useState()
  let [first_name, set_first_name] = useState()
  let [last_name, set_last_name] = useState()
  let [username, set_username] = useState()
  let [password, set_password] = useState()
  let [re_password, set_re_password] = useState()
  let [phone_number, set_phone_number] = useState()
  let [disabled, set_disabled] = useState(true)
  let [err_text, set_err_text] = useState()
  let [is_read, set_is_read] = useState(true)


  function submit(e){
    if (password != re_password)
      set_err_text('Пароли не совпадают')
    else if(!email || !first_name || !last_name || !username || !password || !re_password || !phone_number)
      set_err_text('Не заполнено обязательное поле')
    else{
      fetch('auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'first_name': first_name,
          'last_name': last_name,
          'username': username,
          'password': password,
          're_password': re_password,
          'phone_number': phone_number
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          if ('id' in result){
            set_is_read(false)
            set_err_text('Письмо отправленно на почту')
          }
          else
            set_err_text(result[Object.keys(result)[0]])
        },
        (error) => {
          if (error.response.status == 400){
            set_is_read(false)
            set_err_text(result[Object.keys(result)[0]])
          }
          console.log(error)
          set_err_text('Ошибка')
        }
      )
    }

  }
  return (
    <div className='container'>
      <div className='row mx-1 ms-sm-0'>
        <div className='col-0 col-md-1'/>
        <div className ='col-11'>
          <div className='row gy-3 justify-content-between'>
          <Title mb='20px'>
            Создать&nbsp;аккаунт
          </Title>
          <div className='col-5'>
            <div className='row gy-1'>
              <Text fz='20px' className='' >Имя</Text>
              <Input value = {first_name} onChange={e=>{set_first_name(e.target.value)}} className = 'col-12 col-lg-10 mb-4'/>
              <Text fz='20px' className='' >Логин</Text>
              <Input value = {username} onChange={e=>{set_username(e.target.value)}} className = 'col-12 col-lg-10 mb-4'/>
              <Text fz='20px' className=''>Номер телефона</Text>
              <Input value = {phone_number} onChange={e=>{set_phone_number(e.target.value)}} className = 'col-12 col-lg-10 mb-4' type=""/>
              <Text fz='20px' className=''>Email</Text>
              <Input value = {email} onChange={e=>{set_email(e.target.value)}} className = 'col-12 col-lg-10 mb-5' type=""/>
            </div>
          </div>
          <div className='col-4'>
            <div className='row gy-1'>
              <Text fz='20px' className='' >Фамилия</Text>
              <Input value = {last_name} onChange={e=>{set_last_name(e.target.value)}} className = 'col-12 col-lg-10 mb-4'/>
              <Text fz='20px' className='' >Пароль</Text>
              <Input value = {password} onChange={e=>{set_password(e.target.value)}} className = 'col-12 col-lg-10 mb-4' type="password"/>
              <Text fz='20px' className=''>Повторите пароль</Text>
              <Input value = {re_password} onChange={e=>{set_re_password(e.target.value)}} className = 'col-12 col-lg-10' type="" type="password" />
            </div>
          </div>
        </div>
        <div className='p-0 col-6 d-flex align-items-center mb-4'>
          <Checkbox className='d-inline me-2' type='checkbox' onChange={e=>{set_disabled(!disabled)}}/>
          <Text className='align-middle d-inline'>
            Я прочитал и согласен с <a href='123'>условиями использования</a>, а также с <a href = '123'>политикой конфиденциальности</a>
          </Text>
        </div>
        <Submit_button disabled={disabled} onClick={e=>submit(e)} className='p-2 col-12 col-lg-4'>Создать учетную запись</Submit_button>
        <Red_text is_read={is_read}>{err_text}</Red_text>
      </div>
    </div>
  </div>
  )
}
