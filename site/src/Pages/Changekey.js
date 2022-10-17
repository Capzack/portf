import React, {useState, useEffect} from 'react';
import {Title, Input, Red_text, Submit_button, Bg_svg, Grey_text, Select_shadow} from '../styled/components.js'
import Gear from '../media/images/Gear.svg'
import Key from '../Components/Key.js'

import KeyInput from '../Components/KeyInput.js'
export default function Changekey(props){
  let [market, setMarket] =  useState('')
  let [key, setKey] =  useState('')
  let [secret, setSecret] =  useState('')
  let [markets, setMarkets] = useState()
  let [keylist, setKeylist] = useState()

  let [err_text, setErr_text] =  useState('')
  let [is_read, set_is_read] = useState(true)

  function submit(e){
    if (!secret || !key  || !market){
      setErr_text('Не заполненно обязательное поле')
      set_is_read(true)
    }
    else{
      e.target.disabled = true

      fetch('/api/keys/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "api_key": key,
            "secret_key": secret,
            "market": market
          })
      })
      .then(res => {
        if(res.ok){
          res.json()
          .then(result=>{
            for (let i of markets)
              if (i.id == result.market)
                result.market = i.small_icon
            setKeylist(keylist => [...keylist, result])
            set_is_read(false)
            setErr_text('Ключ добавлен')
            e.target.disabled = false
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

  function remove_key(e, id){
    fetch(`/api/keys/${id}/`,{
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json'
       },
    })
    .then(response=>{
      if (response.ok)
        setKeylist(keylist.filter(v=>v.id != id))
    })
  }

  useEffect(() => {
    let tmp
    fetch('api/markets/', {
      headers: {
         'Content-Type': 'application/json'
       },
    })
    .then(res => res.json())
    .then(result => {
      setMarkets(result)
      setMarket(result[0].id)
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
  }, [])

  let Options
  if (markets){
    Options = markets.map(v =>
      <option key = {v.id} value = {v.id}>{v.display_name}</option>
    )
  }
  let KeyList
  if (keylist){
    KeyList= keylist.map(v =>
      <Key
        key={v.id}
        thisKey={v}
        remove_key={remove_key}
      />
    )
  }

  return (
    <div className='container'>
      <Bg_svg className='col-3' src={Gear} />
      <div className='row mx-1 ms-sm-0'>
        <div className='col-0 col-lg-1'/>
        <div className ='col-12 col-lg-11'>
          <div className='row justify-content-between'>
            <Title mb='20px'>
              Мои ключи
            </Title>
            <div className='col-12 col-md-5 p-0 mb-4'>
              {KeyList}
            </div>
            <div className='col-12 col-md-6 p-0'>
              <Grey_text className=''>
                Добавить ключ
              </Grey_text>
              <Input value={key} onChange={e=>setKey(e.target.value)} className='col-10 col-lg-7 p-2 mt-2' placeholder='Публичный'/>
              <Input value={secret} onChange={e=>setSecret(e.target.value)} className='col-10 col-lg-7 p-2 mt-3' placeholder='Секретный'/>
              <Select_shadow
                className='col-10 col-lg-7 p-2 mt-3'
                value={market}
                onChange={e=>setMarket(e.target.value)}>
                {Options}
              </Select_shadow>
              <div className='col-12'/>
              <Submit_button onClick={e=>submit(e)} className='col-8 col-lg-5 p-2 mt-4 '>Добавить</Submit_button>
              <Red_text is_read={is_read}>{err_text}</Red_text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
