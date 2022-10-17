import React, {useState} from "react";
import {Grey_text, Text, Select, Img} from '../styled/components.js'
import styled from 'styled-components'


export default function Key(props){
  let id = props.thisKey.id
  let status = props.thisKey.status
  let display_key = props.thisKey.display_key.length>=20 ?
    '*'.repeat(16) + props.thisKey.display_key.slice(-4) :
     props.thisKey.display_key
  return(
    <div className='row m-0 pb-5'>
      <Text fw='700' fs='20px' className='col-8 pb-1'>Ключ {props.thisKey.id}</Text>
      <Staus status = {status} className='col-4 p-0'>
        {status == 'OKAY' ? 'Активен':
          status == 'PROCESSING' ? 'В процессе проверки':'Ключ отклонен'}
      </Staus>
      <div className= 'd-flex col-1 p-0 align-items-center'>
        <Img  className= '' src={props.thisKey.market} width='16px' height='16px'/>
      </div>
      <Grey_text className='col-7'>{display_key}</Grey_text>
      <Delete onClick={(e)=>{props.remove_key(e,id)}}className='col-4 p-0'>Удалить</Delete>
    </div>
  )
}

const Delete = styled(Text)`
  cursor: pointer;
`

const Staus = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  color: ${props=>props.status == 'ERROR' ? '#D92B45' :
            props.status == 'OKAY' ? '#31A68A':
              props.status == 'PROCESSING' ? '1D51BB' : '#929191'};
`
