import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';

import {Red_text, Text, Theme_shadow_block, Title} from '../styled/components.js'
import styled from 'styled-components'

export default function History_page(props){
  let history_id = null
  if (props.id){
    const {strategy_id} = useParams()
    history_id = strategy_id
  }
  const [history, setHistroy] = useState([])

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    let href = history_id? `/api/account/${history_id}/history/` : '/api/user_history/'
    fetch(href, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(result=>{
      setHistroy(result)
      if (result.detail)
        setError(true)
      setIsLoaded(true);
    })
  }, [])

  if (error) {
    return (
      <div className='container'>
        <div className='row'>
          <div className = 'col-1'/>
          <div className = 'col-5'>
            <div className="row justify-content-start">
              <Title className='col-lg-9'>
                {history.detail}
              </Title>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else if (!isLoaded) {
    <div>Загрузка</div>
  }
  else {
    if (history.length != 0){
      const History = history.map(v =>
        <HistoryElem key ={v.id} data={v}/>
      )
      return(
        <div className='container'>
          <div className='row'>
            <div className = 'col-1'/>
            <div className = 'col-5'>
              <div className="row justify-content-start">
                <Title className='col-lg-9'>
                  {history_id? history[0].strategy_name :'Стратегии'}
                </Title>
              </div>
            </div>
          </div>
          <div className='row mt-5'>
            <div className = 'col-12'>
              <div className='row p-2'>
                <Text fs='16px' className = 'col-2'>Стратегия</Text>
                <Text fs='16px' className = 'col-3'>Начало</Text>
                <Text fs='16px' className = 'col-3'>Конец</Text>
                <Text fs='16px' className = 'col-2'>Доход</Text>
                <div className = 'col-2'/>
              </div>
              {History}
            </div>
          </div>
        </div>
      )
    }
    else
      return(
        <div className='container'>
          <div className='row'>
            <div className = 'col-1'/>
            <div className = 'col-5'>
              <div className="row justify-content-start">
                <Title className='col-lg-9'>
                  Нет данных
                </Title>
              </div>
            </div>
          </div>
        </div>
      )
  }





}



function HistoryElem(props){
  let [dealsDisplay, setDealsDispaly]=useState('none')
  let start = new Date(props.data.start)
  let end = new Date(props.data.end)
  const Deals = props.data.user_deals.map(v=>
    <Deal key ={v.id} data={v}/>
  )
  return(
    <Theme_shadow_block >
      <div className='row p-2'>
        <Text fs='16px' fw='700' className = 'col-2'>{props.data.strategy_name}</Text>
        <Text fs='16px' className = 'col-3'>{`${start.toLocaleDateString()} ${start.toLocaleTimeString()}`}</Text>
        <Text fs='16px' className = 'col-3'>{`${end.toLocaleDateString()} ${end.toLocaleTimeString()}`}</Text>
        <Red_text is_read={props.data.income>=0} className = 'col-2'>{props.data.income}</Red_text>
        <More_button onClick={e=>{setDealsDispaly('block')}} fs='16px' fw='700' className = 'col-2'>Подробнее</More_button>
      </div>
      <div className='p-0' style={{'display': dealsDisplay}}>
        <OutsideClickHandler onOutsideClick = {() => {setDealsDispaly('none')}}>
          <Theme_shadow_block >
            <div className='row'>
              <Text className = 'col-2 d-inline'/>
              <Text fs='16px' className = 'col-2 '>Тикер</Text>
              <Text fs='16px' className = 'col-3 '>Открытие</Text>
              <Text fs='16px' className = 'col-3 '>Закртыие</Text>
              <Text fs='16px' className = 'col-2 '>Доход</Text>
            </div>
          {Deals}
          </Theme_shadow_block>
        </OutsideClickHandler>
      </div>
    </Theme_shadow_block>
  )
}

function Deal(props){
  let start = new Date(props.data.open_deal_time)
  let end = new Date(props.data.close_deal_time)
  return(
    <div className='row'>
      <Text className='col-2'/>
      <Text fs='16px' className = 'col-2'>{props.data.ticker_name}</Text>
      <Text fs='16px' className = 'col-3'>{`${start.toLocaleDateString()} ${start.toLocaleTimeString()}`}</Text>
      <Text fs='16px' className = 'col-3'>{`${end.toLocaleDateString()} ${end.toLocaleTimeString()}`}</Text>
      <Red_text is_read={props.data.income>=0} className = 'col-2'>{props.data.income}</Red_text>
    </div>
  )
}


const More_button = styled(Text)`
  &:hover{
    cursor: pointer;
  }
`
