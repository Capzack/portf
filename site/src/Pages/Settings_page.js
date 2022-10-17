import React, {useState, useContext } from 'react'
import {Title, Link, Input, Text, Checkbox, Red_text, Shadow_block, Submit_button, Bg_svg} from '../styled/components.js'
import { ThemeContext } from 'styled-components'
import Gear from '../media/images/Gear.svg'

import Google from '../media/images/google.svg'
import Appl from '../media/images/Appl.svg'
import Vk from '../media/images/vk.svg'
import Switch from "react-switch";
import {lightTheme, darkTheme} from '../styled/themes.js'

export default function Settings(props){
  let [checked, setChecked] = useState(localStorage.getItem('theme') == 'darkTheme')

  function handleChange(checked) {
      setChecked(checked);
      if (checked){
        props.setTheme(darkTheme)
        localStorage.setItem('theme', 'darkTheme')
      }
      else {
        props.setTheme(lightTheme)
        localStorage.setItem('theme', 'lightTheme')
      }
    }

  return (
    <div className='container'>
      <Bg_svg className='col-3' src={Gear} />
      <div className='row mx-1 ms-sm-0'>
        <div className='col-0 col-lg-1'/>
        <div className ='col-12 col-lg-11'>
          <div className='row justify-content-between'>
          <Title mb='20px'>
            Настройки
          </Title>
          <div className='col-10'>
            <div className='row'>
                <Text className='col-2 pt-1' fs='20px'>Тема</Text>
                <Switch className='col'
                  checkedIcon = {false} uncheckedIcon = {false}
                  onColor='#ECEFF8'
                  offColor='#28292D'
                  onChange={handleChange}
                  offHandleColor='#ECEFF8'
                  onHandleColor='#28292D'
                  checked={checked} />
            </div>
            <div className='row mt-5'>
              <Link href='/changepassword' className='p-0 mb-2'>
                <Text className='' fs='20px'>Изменить пароль</Text>
              </Link>
              <Link href='/changeemail' className='p-0 mb-2'>
                <Text className='' fs='20px'>Изменить почту</Text>
              </Link>
              <Link href='/changenumber' className='p-0 mb-2'>
                <Text className='' fs='20px'>Изменить номер телефона</Text>
              </Link>
              <Link href='/changename' className='p-0 mb-2'>
                <Text className='' fs='20px'>Изменить никнейм</Text>
              </Link>
              <Link href='/changeimage' className='p-0 mb-2'>
                <Text className='' fs='20px'>Изменить фото профиля</Text>
              </Link>
              <Link href='/changekey' className='p-0 mb-2'>
                <Text className='' fs='20px'>Ключи</Text>
              </Link>
              <Link href='/logout' className='p-0 mb-2'>
                <Text className='' fs='20px'>Выход</Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
