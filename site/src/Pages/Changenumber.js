
import React, {useState} from 'react';
import {Title, Input, Red_text, Submit_button, Bg_svg, Grey_text} from '../styled/components.js'
import Gear from '../media/images/Gear.svg'

export default function Changeemail(props){
  let [phone_number, setPhone_number] = useState('')
  let [err_text, setErr_text] =  useState('')
  let [is_read, set_is_read] = useState(true)

  function submit(e){
    if (!phone_number){
      setErr_text('Не заполненно обязательное поле')
      set_is_read(true)
    }
    else{
      e.target.disabled = true
      fetch('/auth/users/me/', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "phone_number": phone_number,
          })
      })
      .then(res => {
        if(res.ok){
          setErr_text('Номер изменен')
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
              Изменить номер
            </Title>
            <Grey_text className='mb-3'>
              Введите новый номер
            </Grey_text>
            <Input value={phone_number} onChange={e=>{setPhone_number(e.target.value)}} className='col-8 col-lg-3 p-2' placeholder='Номер'/>
            <div className='col-12'/>
            <Red_text is_read={is_read}>{err_text}</Red_text>
            <Submit_button onClick={e=>submit(e)} className='col-8 col-lg-3 p-2 mt-5 '>Продолжить</Submit_button>
          </div>
        </div>
      </div>
    </div>
  )
}
