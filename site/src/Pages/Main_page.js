import React, {useState} from 'react';
import styled from 'styled-components';

import Anim from '../media/gifs/anim.gif'
import Title_image from '../media/images/Main_page_title.png'
import Actual_data from '../media/images/Actual_data.svg'
import Auto_trade from '../media/images/Auto_trade.svg'
import Tols from '../media/images/Tols.svg'
import Phone1 from '../media/images/Phone1.png'
import Phone2 from '../media/images/Phone2.png'
import Phone3 from '../media/images/Phone3.png'
import Businessman1 from '../media/images/Businessman1.svg'
import Businessman2 from '../media/images/Businessman2.svg'
import Businessman3 from '../media/images/Businessman3.svg'
import Businessman4 from '../media/images/Businessman4.svg'
import Card from '../media/images/Card.svg'

import {Text, White_text, Black_text, Submit_button, Section, Link, Input, Svg, Red_text} from '../styled/components.js'

export default function Main_page(props){
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [textarea, setTextarea] = useState('')
  let [message, setMessage] = useState('')
  let [is_read, setIs_read] = useState(false)

  function handleSubmit(e){
    if (!email || !textarea){
      setMessage('Не заполнено обязательное поле')
      setIs_read(true)
    }
    else
      fetch('api/feedback/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'sender': email,
          'message': textarea,
        })
      })
      .then(response => {
          if (response.ok){
            setMessage('Сообщение отправлено')
            setIs_read(false)
          }

          else{
            setMessage('Ошибка')
            setIs_read(true)
          }
      })
   }

  return (
    <div className='container-fluid p-0'>
      <Title bg_image={Title_image} className='justify-content-center d-flex align-items-center'>
        <Logo src={Anim}></Logo>
      </Title>
      <div className='container mb-5'>
        <div className='row justify-content-between'>
          <div className='col-6 col-lg-4 p-2 m-0'>
            <White_block className='text-center py-4'>
              <Svg width='19.68vw' filter='none' src={Actual_data}/>
              <Black_text fs={props.isMobile ? '12px':'20px'} className='text-center'>Актуальные<br/>данные</Black_text>
            </White_block>
          </div>
          <div className='col-6 col-lg-4 p-2 m-0'>
            <White_block className='text-center py-4'>
              <Svg width='20.88vw' filter='none' src={Auto_trade}/>
              <Black_text fs={props.isMobile ? '12px':'20px'} className='text-center'>Автоматизированная<br/>торговля</Black_text>
            </White_block>
          </div>
          <div className='col-6 col-lg-4 p-2 m-0'>
            <White_block className='text-center py-4'>
              <Svg width='14.24vw' filter='none' src={Tols}/>
              <Black_text fs={props.isMobile ? '12px':'20px'} className='text-center'>Аналитика и<br/>инструменты</Black_text>
            </White_block>

          </div>
        </div>
      </div>
      <Section className='d-none d-md-flex row justify-content-center py-5 mb-5'>
        <Text className='col-12 mb-5 p-0 text-center'fs='36px'>Автоматизируйте<br/>торги в два клика</Text>
        <div className='col-4 col-lg-3 col-xxl-2 text-center p-0'>
          <img  src={Phone1}/>
          <Text className='mt-2 text-center'>Выберите</Text>
        </div>
        <div className='col-4 col-lg-3 col-xxl-2 text-center p-0'>
          <img  src={Phone2}/>
          <Text className='mt-2 text-center'>Подключите</Text>
        </div>
        <div className='col-4 col-lg-3 col-xxl-2 text-center p-0'>
          <img  src={Phone3}/>
          <Link href ='/shop'>
            <Blue_block className='text-center px-3 py-2'>Зарабатывайте</Blue_block>
          </Link>
        </div>
        <div className='row justify-content-center'>
          <Blue_block className='mt-5 col-6 col-xl-4 col-xxl-3'>
            <Link href ='/shop'>
              <White_text className='text-center m-0 p-4'>Перейти к стратегиям</White_text>
            </Link>
          </Blue_block>
        </div>
      </Section>
      <div className='container mb-5'>
        <div className='row'>
          <img className='d-none d-sm-block' style={{width:'20vw'}} src={Businessman1}/>
          <div className='col-10 col-sm-8 col-lg-6 p-3'>
            <Section >
              <Text fs={props.isMobile ? '12px':'20px'} className='p-3 m-0'>Оптимизируем и автоматизируем <br/>торговые процессы<br/><br/>Повышаем ваш фокус на тенденциях рынка, благодаря автоматизации торгов</Text>
            </Section>
          </div>
        </div>
        <div className='row justify-content-end'>
          <div className='col-10 col-sm-8 col-lg-5 p-3 '>
            <Section>
              <Text fs={props.isMobile ? '12px':'20px'} className='px-5 p-4 m-0'>Тепеперь возможна параллельная реализация сразу нескольких торговых процессов</Text>
            </Section>
          </div>
          <img className='d-none d-sm-block' style={{width:'23vw'}} src={Businessman2}/>
        </div>
        <div className='row'>
          <img className='d-none d-sm-block' style={{width:'12vw', 'margin-left':'4vw'}} src={Businessman3}/>
          <div className='col-0 col-sm-1'/>
          <div className='col-10 col-sm-7 col-md-8 p-3 '>
            <Section className='p-3'>
              <Text fs={props.isMobile ? '12px':'20px'} className='p-3 m-0'>Диверсификация рисков и возможность повышения доходности всего инвестиционного потенциала</Text>
            </Section>
          </div>
        </div>
        <div className='row justify-content-end'>
          <div className='col-10 col-sm-7 col-md-8 col-lg-6 p-3 '>
            <Section className='p-3'>
              <Text fs={props.isMobile ? '12px':'20px'} className='p-3 m-0'>Высокий уровень безопасности (деньги остаются на счету клиента) </Text>
            </Section>
          </div>
          <img className='d-none d-sm-block' style={{width:'12vw', 'margin-left':'4vw'}} src={Businessman4}/>
        </div>
        <div className='row'>
          <img className='d-none d-sm-block' style={{width:'12vw', 'margin-left':'4vw'}} src={Card}/>
          <div className='p-3 col-8 col-sm-5 d-block'>
            <Section>
              <Text fs={props.isMobile ? '12px':'20px'} className='p-4 m-0'>Создаём вам пассивный доход</Text>
            </Section>
          </div>
        </div>
      </div>
      {/* <div className='container'>
        <Text className='mb-5'>Попробовать можно прямо сейчас</Text>
      </div> */}
      <Section className='row justify-content-center py-5' br='32px 32px 0px 0px'>
        <Text className='text-center mb-2' fs='36px' fw='700'>Обратная связь</Text>
        <Text className='text-center mb-5'  fw='400'>Напишите нам и мы поможем</Text>
        <div className='col-10 col-sm-8 col-md-5'>
          <div  className='row gy-3 justify-content-end'>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Имя'/>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className='mb-1' placeholder='Email адрес'/>
            <Textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} style={{height: '20vh'}} placeholder='Опишите вопрос, или возникшую проблему'/>
            <Red_text is_read={is_read}>{message}</Red_text>
            <Submit_button onClick={handleSubmit} className='p-3 mt-4 col-5'>Отправить</Submit_button>
          </div>
        </div>
      </Section>
    </div>
  )
}

const White_block = styled.div`
  background: #FFFFFF;
  border: 10px solid #A8ABBE;
  border-radius: 32px;
`


const Blue_block = styled.div`
  background: rgba(43, 163, 217, 0.69);
  background-blend-mode: lighten;
  border-radius: 16px;
  font-size: 20px;
  color: #ECEFF8;
`

const Title = styled.div`
  border-radius: 0px;
  padding-top: 11vh;
  height: calc(66vw + 17vh);
  margin-bottom: 10vh;
  max-height: 100vh;
  margin-top: -17vh;
  background-image: url(${props=>props.bg_image});
  background-size:100vw calc(66vw + 17vh);;
  background-repeat: no-repeat;
`


const Textarea = styled.textarea`
  background: #ECEFF8;
  border-radius: 16px;
  padding: 5px;
  ::placeholder{
    font-size: 16px;
    line-height: 110%;
    font-weight: 400;
    color: #28292D;
  }
`

const Logo = styled.img`
  max-height: 100vh;
  max-width: 100vh;
  width: 90vw;
`
