import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import {Theme_shadow_block, Text, Svg, Grey_text, Link} from '../styled/components.js'
import Off_button from '../media/images/Off_button.svg'
import Vector from '../media/images/Vector.svg'

import Income from '../Components/Income.js'
import Period_select from '../Components/Period_select.js'
import KeyInput from '../Components/KeyInput.js'


export default function Strategy(props){
  if (!props.data)
    return

  let opt = {}
  for (let i in props.data.data){
    if (props.data.data[i].length >0)
      opt[i] = ((props.data.data[i].slice(-1)[0][1]-props.data.data[i][0][1])*100/props.data.data[i][0][1]).toFixed(0)
    else
      opt[i] = 0
  }

  let [income, set_income] = useState(Object.values(opt)[0])
  let [points, set_points] = useState(props.data.data[Object.keys(opt)[0]])
  let [options, setOptios] = useState(opt)
  let [status, setStatus] = useState(props.data.status)
  let [active, setActive] = useState('is_connected' in props.data ? !props.data.is_connected : props.data.status == 'Active' ? true : false)
  let [modal, setModal] = useState('none')

  let container = useRef(null)

  function changeKey(e, id){
    e.preventDefault()
    fetch(`/api/account/${props.data.id}/set_key/`, {
      headers: {
         'Content-Type': 'application/json'
       },
       method:'POST',
       body: JSON.stringify({
         "new_key": id,
       })
    })
    .then(res=>{
      if(res.ok)
        props.setActive(true)
      else
        alert('Произошла ошибка')
    })
  }

  let href
  if (props.account)
    href = `/strategy/${props.data.strategy}?connected_to=${props.data.id}`
  else
    if(props.data.connected_to == null)
      href = `/strategy/${props.data.id}`
    else
      href = `/strategy/${props.data.id}?connected_to=${props.data.connected_to}`


    return(
      <div className = 'row'>
        <StrategyContainer className='p-2' active={active} ref = {container}>
          <Link href = {href}>
            <div className='col-12'>
              <Strategy_header
                account ={props.account}
                name = {props.data.name}
                active={active}
                setActive={setActive}
                small_icons={props.data.small_icons}
                id ={props.data.id}
                status={status}
                setModal={setModal}
              />
            </div>
            {props.data.data.total.length > 1? (
              <div>
                <Canvas points={points} parent={container}/>
                <div className='pe-0 pt-2 row align-items-center justify-content-between'>
                  <div className='col-7 m-0 pr-0'>
                    <Period_select
                      font_size = '12px'
                      select = {'Доходность'}
                      options = {options}
                      set_income={set_income}
                      points_options={props.data.data}
                      set_points={set_points}/>
                  </div>
                  <div className = 'col-5 p-0 pe-1'>
                    <Income padding={'4px'} income = {income}/>
                  </div>
                </div>
              </div>
            ):(
              <Text className='ps-3 pt-2 row justify-content-between'>
                Торгов еще не было
              </Text>
            )}
          </Link>
        </StrategyContainer>
        <KeyInput modal={modal} setModal={setModal} choseKey={changeKey} availableMarkets={props.data.markets}/>
      </div>
    )
}

function Strategy_header(props){

  let Markets = props.small_icons.map((v, i)  =>
    <Svg key={i} width='17px' height='17px' src={v}/>
  )

  function changeActive(e, active){
    e.preventDefault()
    fetch(`/api/account/${props.id}/${active ? 'on':'off'}/`, {
      headers: {
         'Content-Type': 'application/json'
       },
    })
    .then(res=>{
      if(res.ok)
        props.setActive(active)
      else
        if (active)
          alert('Не удалось включить')
        else
          alert('Не удалось выключить')
    })

  }

  if (props.account)
  return(
    <div className = 'row align-items-center justify-content-between'>
      {props.status == 'KeyDeclined'? (
        <div className='col-8 ps-3'>
          <Text fs='10px'>Ключ был удален</Text>
          <Chose fs='10px' onClick={e=>{props.setModal('block'); e.preventDefault();}}>Подключить новый</Chose>
        </div>
      ):(
        <div className='col-4'>
          <Svg width='35px' height='35px' src={Off_button} onClick={e=>{changeActive(e, !props.active)}}/>
        </div>
      )}

      <div className='col-4 pe-4 text-end'>
        {Markets}
      </div>
      <Text fs='16px' style = {{'minHeight': '55px'}} className='ps-3 col-12 col-xl-7'>
        {props.name}
      </Text>
      <Grey_text className='ps-3' fs='12px'>{props.strategy_key}</Grey_text>
    </div>
  )
  else
  return(
    <div className = 'row justify-content-between'>
      <Text fs='16px' style = {{'minHeight': '55px'}} className='ps-3 col-10'>
        {props.name}
      </Text>
      <div className='col-2'>
        {Markets}
      </div>
    </div>
  )
}

const Canvas = (props = {}) => {
  const canvas = useRef(null);
  const paddingY = 15
  const height = 150;
  const [width, setWidth] = useState()

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    setWidth(props.parent.current.clientWidth)
    context.clearRect(0, 0, width, height+paddingY*2)
    const deltaX = props.points.slice(-1)[0][0]-props.points[0][0]

    let ymin = Infinity
    let ymax = -Infinity
    props.points.forEach((i) => {
      ymin = i[1] < ymin ? i[1] : ymin
      ymax = i[1] > ymax ? i[1] : ymax
    })
    const deltaY = ymax-ymin
    context.beginPath();
    context.moveTo(0, height*(ymax-props.points[0][1])/deltaY+paddingY);
    let dl = 0, k = 0.33;
    for (let i = 0; i < props.points.length-2; i++){
      let dr = (height*(ymax-props.points[i+2][1])/deltaY - height*(ymax-props.points[i+1][1])/deltaY) / 2 * k;
      context.bezierCurveTo(
        width*(props.points[i][0]-props.points[0][0])/deltaX+k*30, height*(ymax-props.points[i][1])/deltaY+dl+paddingY,
        width*(props.points[i+1][0]-props.points[0][0])/deltaX-k*30, height*(ymax-props.points[i+1][1])/deltaY-dr+paddingY,
        width*(props.points[i+1][0]-props.points[0][0])/deltaX, height*(ymax-props.points[i+1][1])/deltaY+paddingY)
    }
    props.points[0][1]-props.points.slice(-1)[0][1] > 0 ? context.strokeStyle = '#D92B45' : context.strokeStyle = '#31a68a';
    context.stroke();
  });
  return <canvas ref={canvas} height={height+paddingY*2} width={width} style={{height,width}}/>;
};

const StrategyContainer = styled(Theme_shadow_block)`
  opacity:${props=> props.active ? 1 : 0.5}
`

const Chose = styled(Text)`
  cursor: pointer;
`
