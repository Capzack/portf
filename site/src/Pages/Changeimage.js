import React, {useState, useRef} from 'react';
import {Title, Input, Red_text, Submit_button, Bg_svg, Grey_text} from '../styled/components.js'
import Gear from '../media/images/Gear.svg'


export default function Changeemail(props){
  let [err_text, setErr_text] =  useState('')
  let [is_read, set_is_read] = useState(true)
  let input = useRef(null)

  function submit(e){
      console.log(input)
      e.target.disabled = true
      let reader = new FileReader();
      reader.readAsDataURL(input.current.files[0]);
      reader.onloadend = function() {
        localStorage.setItem('profile_picture', reader.result)
        fetch('/auth/users/me/', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "profile_picture": reader.result,
            })
        })
        .then(res => {
          if(res.ok){
            setErr_text('Изображение изменено')
            set_is_read(false)
            e.target.disabled = false
            res.json()
            .then(result =>{
              localStorage.setItem('profile_picture', result.profile_picture)
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
              Изменить фото
            </Title>
            <Grey_text className='mb-3'>
              Добавте изображение
            </Grey_text>
            <Input ref={input} type='file' accept=".png, .jpg, .jpeg" className='col-8 col-lg-3 p-2'/>
            <div className='col-12'/>
            <Red_text is_read={is_read}>{err_text}</Red_text>
            <Submit_button onClick={e=>submit(e)} className='col-8 col-lg-3 p-2 mt-5 '>Продолжить</Submit_button>
          </div>
        </div>
      </div>
    </div>
  )
}
