import React, {useState} from 'react';
import styled from 'styled-components'

import Home from '../media/images/Home.svg'
import History from '../media/images/History.svg'
import Arrow from '../media/images/Arrow.svg'
import Person from '../media/images/Person.svg'

import {Link, Svg, Text} from '../styled/components.js'


export default function Footer_component(props){
  return(
    <Footer className='row justify-content-around p-0 m-0 text-center gy-3 align-items-center'>
        <Link className='col-2 p-0 ' href='/'>
          <Svg src={Home}/>
          <Text fs='12px'>Главная</Text>
        </Link>
        <Link className='col-2 p-0' href='/shop'>
          <Svg src={Arrow}/>
          <Text fs='12px'>Стратегии</Text>
        </Link>
        <Link className='col-2 p-0' href='/history'>
          <Svg src={History}/>
          <Text fs='12px'>История</Text>
        </Link>
        <Link className='col-2 p-0' href='/account'>
          <Svg src={Person} />
          <Text fs='12px'>Профиль</Text>
        </Link>
    </Footer>
  )
}


const Footer = styled.footer`
  width: 100%;
  height: 10vh;
  background: ${props => props.theme.header_bg};
  position: sticky;
  top: 90vh;
  bottom: 0px;
  margin-bottom: 0px;

`
