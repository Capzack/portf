import React, {useState} from 'react';
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';

import Polygon_up from '../media/images/Polygon_up.svg'
import Polygon_down from '../media/images/Polygon_down.svg'
import Settings from '../media/images/settings.svg'
import Notification from '../media/images/notification.svg'
import User_image from '../media/images/123.png'
import {Text, White_text, Link, Black_text, Grey_text, Svg, Modal, Menu} from '../styled/components.js'

export default function Header(props){
  let [modalActive, setActive] = useState('none')
  let pathname = window.location.pathname
  if (!props.isMobile)
    return (
      <Nav_bar className='row justify-content-around align-items-center text-center sticky-top'>
        <Logo className='col-6 col-lg-2 p-0 m-0' href='/'>
          <img src={Polygon_down} alt="" />
          Quantity
          <img src={Polygon_up} alt="" />
        </Logo>
        <div className = 'col-9 col-lg-7 p-0 m-0'>
          <Link className='me-5' href='/shop'>
            <White_text className = 'm-0 d-inline' fs = '16px'>Магазин</White_text>
          </Link>
          <Link className='me-5' href='/account'>
            <White_text className = 'm-0 d-inline' fs = '16px'>Мои&nbsp;стратегии</White_text>
          </Link>
          <Link className='me-5' href='/history'>
            <White_text className = 'm-0 d-inline' fs = '16px'>История&nbsp;подключений</White_text>
          </Link>
          <Link href='/notifications'>
            <White_text className = 'm-0 d-inline' fs = '16px'>Уведомления</White_text>
          </Link>
        </div>
      {props.auth ? (
        <div className = 'col-4 col-md-3 m-0 p-0'>
          <div className = 'd-flex justify-content-center' onClick = {() => setActive(true)}>
            <Image src={localStorage.getItem("profile_picture")=='null' ? User_image : localStorage.getItem('profile_picture')}/>
            <Text fw='bold' className = 'col-6 col-sm-4 col-md-5 ps-2 text-start d-flex align-items-center'>
              {localStorage.getItem("username")}
            </Text>
          </div>
        </div>
      ):(
      <Link className = 'col-6 col-md-2 m-0 p-0' href='/login'>
        <White_text className='m-0'fs = '16px'>Вход</White_text>
      </Link>
    )}
      <Account_menu active = {modalActive} setActive = {setActive}/>
  </Nav_bar>
  )
  else {
    let location = ''
    if (pathname == '/shop')
      location = 'Магазин'
    else if (pathname.includes('history'))
      location = 'История'
    else if (pathname.includes('strategy'))
      location = 'Стратегия'
    else if (pathname == '/notification')
      location = 'Уведомления'
    else if (pathname == '/settings')
      location = 'Настройки'
    else if (pathname == '/regisration')
      location = 'Создать аккаунт'
    else if (pathname == '/filter')
      location = 'Фильтр'
    else if (pathname == '/account')
      location = localStorage.getItem('username')
    else if (pathname.includes('change'))
      location = 'Настройки'
    if(location)
      return (
        <Settings_bar className='row align-items-center p-2 m-0'>
          <div className='col-2'/>
          <Text className='col-8 text-center'>
            {location}
          </Text>
          <Link href='/settings' className='col-2 text-center'>
            <Svg src ={Settings}/>
          </Link>
        </Settings_bar>
      )
    else
      return(
        <Settings_bar/>
      )
  }
}

function Account_menu(props){
  return(
    <Modal display={props.active}>
      <OutsideClickHandler onOutsideClick = {() => {props.setActive('none')}}>
        <Menu className = 'col-5 col-md-4 col-lg-3 col-xl-2 p-2 py-3'>
          <div className = 'row gy-3 m-0 text-start'>
            <div className='col-3 p-0'>
              <Image src={localStorage.getItem("profile_picture")=='null' ? User_image : localStorage.getItem('profile_picture')}/>
            </div>
            <div className = 'col-9 p-0 ps-1'>
              <Black_text className = 'm-0'>
                {localStorage.getItem("username")}
              </Black_text>
            </div>
            <Link className = 'mb-2 mt-4' href='/settings'>
              <Black_text className='col-12 p-0'>
                <img src={Settings} className='col-2'/>
                Настройки
              </Black_text>
            </Link>
            <Link className = 'mb-2' href='/notifications'>
              <Black_text className='col-12 p-0'>
                <img src={Notification} className='col-2'/>
                Уведомления
              </Black_text>
            </Link>
            <Link href='/logout'>
              <Black_text className='col-8 p-0'>
                Выход
              </Black_text>
            </Link>
          </div>
        </Menu>
      </OutsideClickHandler>
    </Modal>
  )
}



const Logo = styled(Link)`
  text-transform: uppercase;
  font-size: 15px;
  font-family: 'Play Great';
  color: ${props => props.theme.logo_color};
  text-shadow:1px 1px 2px #161414;
  &:hover{
    color: ${props => props.theme.logo_color};
  }
`


const Image = styled.img`
 width: 5vh;
 height: 5vh;
 border: 2px solid black;
 border-radius: 50%;
`


const Nav_bar = styled.div`
  height: 10vh;
  min-height: 70px;
  z-index: 4;
  width: 100%;
  border-radius: 0px 0px 0px 32px;
  background: ${props => props.theme.header_bg};
  backdrop-filter: blur(5px);
  margin-left: 0px;
`

const Settings_bar = styled.div`
  height: 10vh;
  width: 100%;
`
