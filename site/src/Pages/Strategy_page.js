import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';

import {Img, Bg_svg, Title, Theme_shadow_btn, Theme_shadow_block, Text, Grey_text, Red_text, Black_text, Theme_input, Svg, Modal , Menu , Link} from '../styled/components.js'
import Income from '../Components/Income.js'
import Period_select from '../Components/Period_select.js'
import Pie_chart from '../Components/Pie_chart.js'
import Line_chart from '../Components/Line_chart.js'
import Commentary from '../Components/Сomment.js'
import KeyInput from '../Components/KeyInput.js'

import Candles from '../media/images/Candles.svg'
import Income_image from '../media/images/Income.svg'
import Undo_image from '../media/images/fad_undo.svg'
import Arrowr from '../media/images/arrow-rigth.svg'
import Send from '../media/images/Send.svg'




export default function Strategy_page(props){
  const {strategy_id} = useParams();
  const connected_to = new URLSearchParams(window.location.search).get('connected_to')
  const navigate = useNavigate();

  let [error, setError] = useState(null);
  let [isLoaded, setIsLoaded] = useState(false);
  let [Strategy, setStrategy] = useState({});

  let [income, setIncome] = useState();
  let [options, setOptios] = useState({})
  let [loss, setLoss] = useState();
  let [options_loss, setOptios_loss] = useState({})

  let [comment, setComment] = useState('')
  let [commentsArray, setCommentsArray] = useState()

  let [modal, setModal] = useState('none')
  let [errText, setErrText] = useState('')
  let [isRead, setIsRead] = useState(false)

  let [isConnected, setIsConnected] = useState(false)
  let [isAuth, setIsAut] = useState(localStorage.getItem('access'))
  function subscribe(e, id){
    fetch('/api/account/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "key": id,
        'strategy': strategy_id
      })
    })
    .then(res=>{
      if (res.ok){
        res.json()
        .then(result=>{
          navigate(`/strategy/${strategy_id}?connected_to=${result.id}`)
          window.location.reload()
        })
      }
      else {
        setErrText('Ошибка')
        setIsRead(true)
      }
    })
  }

  function unsubscribe(e){
    fetch(`/api/account/${connected_to}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>{
      if (res.ok){
        navigate(`/strategy/${strategy_id}`)
        window.location.reload()
      }
      else {
        setErrText('Ошибка')
        setIsRead(true)
      }
    })
  }

  function postComment(e, text){
    if(text)
      fetch('/api/commentary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "commented_object": `/api/strategy/${strategy_id}/`,
          'text': text
        })
      })
      .then(res=>res.json())
      .then(result=>{
        setCommentsArray([...commentsArray, result])
      })
  }

  useEffect(() => {
    let url = connected_to ? `/api/account/${connected_to}/` : `/api/strategy/${strategy_id}/`
    fetch(url, {
      headers: {
         'Content-Type': 'application/json'
       },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setStrategy(result);
          if(result.data.total){
            let [inc, los] = calc_periods(result.data.total)
            setOptios(inc)
            setIncome(inc['day'])
            setOptios_loss(los)
            setLoss(los['day'])
            setIsConnected(result.is_connected || result.strategy)
          }
          setIsLoaded(true);

        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      ).then(()=>{
        fetch('/api/commentary/list/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "commented_object": `/api/strategy/${strategy_id}/`,
          })
        })
        .then(res=>res.json())
        .then(result => {
          setCommentsArray(result)
        })
      })
  }, [])

  if (error) {
    return (
      <div>Ошибка</div>
    )
  }
  else if (!isLoaded) {
    <div>Загрузка</div>
  }
  else {
    let begin_trade = new Date(Strategy.begin_trade)
    const Income_data = Object.keys(options).map(k =>
      <Income_element key={k} period={k} value={options[k]} />
    );

    let Comments_list
    if (commentsArray)
      Comments_list = commentsArray.map((v) =>
        <Commentary key={v.id} comment={v}/>
      );


    return (
    <div className='container'>
      <Bg_svg  src={Candles} />
      <div className='row mx-1 ms-sm-0 gy-3'>
        <div className='col-0 col-md-1'/>
        <div className ='col-12 col-sm-6 col-md-5'>
          <div className="row justify-content-start">
            <Title mb='60px' className='col-12 col-sm-9'>
              {Strategy.name}
            </Title>
            <div className="col-12 my-5">
              <div className=' row justify-content-between gy-3'>
                <div className='col-12 col-lg-5 p-0'>
                  <Income padding = {'16px 4px'} income = {income}/>
                  <div className='mt-1 ps-2'>
                    <Period_select fs='12px'
                      select = {'Доходность'}
                      options = {options}
                      income={income}
                      set_income={setIncome}
                    />
                  </div>
                </div>
                <div className='col-12 col-lg-5 p-0'>
                  <Income padding = {'16px 4px'} income = {loss}/>
                  <div className='mt-1 ps-2'>
                    <Period_select fs='12px'
                      select = {'Максимальная просадка'}
                      options = {options_loss}
                      income={loss}
                      set_income={setLoss} />
                  </div>
                </div>
              </div>
            </div>
            {isConnected ?(
              <Theme_shadow_btn onClick={e=>{unsubscribe(e)}} className = 'text-center col-12 col-sm-9 py-3 mb-5'>
                <Text fs='16px'>
                    Отписаться
                </Text>
                <Red_text is_read={isRead}>{errText}</Red_text>
              </Theme_shadow_btn>
            ):(
              <Theme_shadow_btn onClick={e=>{isAuth? setModal('block') : navigate('/login')}} className = 'text-center col-12 col-sm-9 py-3 mb-5'>
                <Text fs='16px'>
                    Подключить
                </Text>
              </Theme_shadow_btn>
            )}
            <div className='col-12 col-sm-10 mt-5 p-0'>
              <Pie_chart compound={isConnected? Strategy.strategy_data.compound : Strategy.compound}/>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-6'>
          <div className='row gy-3'>
            <div className='col-12 p-0'>
              <Line_chart data={Strategy.data.total}/>
            </div>
            <div className='col-12'>
              <div className='row justify-content-between gy-3'>
                <div className='col-12 col-lg-5 p-0'>
                  <Theme_shadow_block className='p-3'>
                    <div className='gy-2'>
                      <Grey_text className='mt-0'>
                        Начало торгов
                      </Grey_text>
                      <Text fs='16px'>
                        {begin_trade.toLocaleDateString()}
                      </Text>
                      <Grey_text className='mt-4'>
                         Частота сделок
                      </Grey_text>
                      <Text fs='16px'>
                        {Strategy.trading_frequency}
                      </Text>
                    </div>
                  </Theme_shadow_block>
                </div>
                <div className='col-12 col-lg-6 p-0'>
                  <Theme_shadow_block className='py-3 px-2'>
                    <div className='gy-2'>
                      <Grey_text className='mt-0 mb-4'>
                        Доходность
                      </Grey_text>
                      <div className='col-12'>
                        {Income_data}
                      </div>
                    </div>
                  </Theme_shadow_block>
                </div>
              </div>
            </div>
            {isConnected ?(
              <Theme_shadow_block className = 'text-center py-3 col-md-10 col-lg-7 mt-4 p-0'>
                <Link className='' href ={`/history/${connected_to}`}>
                  <Img height='24px' width= '24px' className ='d-inline' src={Undo_image} />
                  <Text fs='16px' className='d-inline' >
                      История стратегии
                  </Text>
                  <Img height='24px' width= '24px' className ='d-inline' src={Arrowr} />
                </Link>
              </Theme_shadow_block>
            ):(
              <Theme_shadow_block className = 'text-center py-3 col-md-10 col-lg-7 mt-4 p-0'>
                <Text fs='16px' className='d-inline' >
                    Подпишитесь чтобы увидеть историю
                </Text>
              </Theme_shadow_block>
            )}


          </div>
        </div>
      </div>
      <div className='row mt-4 mb-5'>
        <div className='col-0 col-md-1'/>
        <div className='col-12 col-md-11'>
          <Theme_input value={comment} onChange={e=>{setComment(e.target.value)}} className='col-12 col-sm-6' placeholder='Введите коментарий'/>
          <Send_btn onClick={e=>{postComment(e, comment)}} width='25px' height='25px' src={Send}/>
          {Comments_list}
        </div>
      </div>
      <KeyInput modal={modal} setModal={setModal} choseKey={subscribe} availableMarkets={Strategy.markets}/>
    </div>
    )
  }
}

function calc_periods(data){
  let period = [
    'day',
    'month',
    'quarter',
    'year',
  ]
  if (data.length<2)
    return [{[period[0]]: 0}, {[period[0]]: 0}]
  let current = [
    Date.now()/1000 - 86400,
    Date.now()/1000 - 2592000,
    Date.now()/1000 - 7776000,
    Date.now()/1000 - 31104000
  ]
  let last = data.slice(-1)[0][1]
  let incomes = {}
  let loss = {}
  let min = 0
  let this_loss
  for (let i = data.length-1; i>0; i--){
    if (data[i-1][1]-data[i][1] >= 0){
      this_loss = (data[i-1][1]-data[i][1])*-100/data[i-1][1]
      if (this_loss < min)
        min = this_loss
    }
    if (data[i][0]<= current[Object.keys(incomes).length]){
      incomes[period[Object.keys(incomes).length]] = ((last - data[i][1])*100/data[i][1]).toFixed(2)
      loss[period[Object.keys(incomes).length-1]] = min.toFixed(2)
      if (incomes.length >= 4)
      break
    }
  }
  incomes['total'] = ((last - data[0][1])*100/data[0][1]).toFixed(0)
  return[incomes, loss]
}

function Income_element(props){
  const styles = {
    image:{
      'filter': 'invert(1)',
      'height':'10px',
      'width':'10px',
      padding:'0px',
      'marginTop': '2px',
      transform: props.value > 0 ? 'rotate(-90deg)' : 'rotate(0deg)',
    }
  };
  return(
      <div className='mt-3 d-flex justify-content-between;'>
        <Text fs='16px' className='col-8'>{props.period}</Text>
        <Red_text className='' is_read={props.value <= 0}>
          {props.value}%
          <img className ='ms-1 mb-1' style = {styles.image} src={Income_image} />
        </Red_text>

      </div>
  )
}


const Send_btn = styled(Svg)`
  margin-left: -27px;
  cursor: pointer;
`
