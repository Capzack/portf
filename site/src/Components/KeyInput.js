import React, {useState, useEffect} from "react";
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';

import {Modal, Menu, Red_text, Img, Grey_text, Black_text, Link, Submit_button} from '../styled/components.js'

export default function KeyInput(props){

  let [keylist, setKeylist] = useState()
  let [errText, setErrText] = useState('')
  let [isRead, setIsRead] = useState(false)

  function showModal(){
    if (!keylist){
      let tmp
      fetch('/api/markets/', {
        headers: {
           'Content-Type': 'application/json'
         },
      })
      .then(res => res.json())
      .then(result => {
        tmp = result
      })
      .then(()=>{
        fetch('/api/keys/', {
          headers: {
             'Content-Type': 'application/json'
           }
        })
        .then(res => res.json())
        .then(result => {
          result = result.filter((v)=> props.availableMarkets.includes(v.market) && v.status=='OKAY')
          for(let i of result){
            for(let j of tmp){
              if (i.market == j.id){
                i.market = j.small_icon
                break
              }
            }
          }
          setKeylist(result)
        })
      })
    }
  }

  useEffect(()=>{
    if (props.modal == 'block')
      showModal()
  },[props.modal])


  let Keys
  if (keylist)
    if (keylist.length > 0)
      Keys = keylist.map((v) =>
        <Key choseKey={props.choseKey} key={v.id} thisKey={v}/>
      );
    else
      Keys = EmptyKeyList()

  return(
    <Modal display={props.modal}>
      <OutsideClickHandler onOutsideClick = {(e) => {props.setModal('none')}}>
        <KeyMenu className='col-6 p-3'>
          {Keys}
          <Red_text is_read={isRead}>{errText}</Red_text>
        </KeyMenu>
      </OutsideClickHandler>
    </Modal>
  )
}

function Key(props){
  return(
    <div className='row m-0 pb-2'>
      <div className= 'd-none d-sm-flex col-1 p-0 align-items-center'>
        <Img  className= '' src={props.thisKey.market} width='16px' height='16px'/>
      </div>
      <Grey_text className='col-8'>{props.thisKey.display_key}</Grey_text>
      <Chose onClick={(e)=>{props.choseKey(e, props.thisKey.id)}} className='col-2'>Выбрать</Chose>
    </div>
  )
}

function EmptyKeyList(props){
  return(
    <div className='row m-0 pb-2'>
      <Black_text>
        Нет доступных ключей
      </Black_text>
      <Link className='mt-2' href='/changekey'>
          <Submit_button className='col-6 p-2'>Добавить</Submit_button>
      </Link>
    </div>
  )
}


const Chose = styled(Black_text)`
  cursor: pointer;
`

const KeyMenu = styled(Menu)`
  border-radius: 32px;
  position: fixed;
  top:40%;
  left: 50%;
  min-width: 400px;
  transform: translate(-50%, 0);
`
