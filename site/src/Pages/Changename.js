import React, {useState} from 'react';
import {Title, Input, Red_text, Submit_button, Bg_svg, Grey_text} from '../styled/components.js'
import Gear from '../media/images/Gear.svg'


export default function Changeemail(props){
  let [name, setName] = useState('')
  let [err_text, setErr_text] =  useState('')
  let [is_read, set_is_read] = useState(true)

  function submit(e){
    if (!name){
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
            "nickname": name,
          })
      })
      .then(res => {
        if(res.ok){
          setErr_text('Имя изменено')
          set_is_read(false)
          e.target.disabled = false
          res.json().
          then (result=>{
              localStorage.setItem('username', result.nickname)
          })
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
              Изменить никнейм
            </Title>
            <Grey_text className='mb-3'>
              Введите новый никнейм чтобы продолжить
            </Grey_text>
            <Input value={name} onChange={e=>{setName(e.target.value)}} className='col-8 col-lg-3 p-2' placeholder='Никнейм'/>
            <div className='col-12'/>
            <Red_text is_read={is_read}>{err_text}</Red_text>
            <Submit_button onClick={e=>submit(e)} className='col-8 col-lg-3 p-2 mt-5 '>Продолжить</Submit_button>
          </div>
        </div>
      </div>
    </div>
  )
}
