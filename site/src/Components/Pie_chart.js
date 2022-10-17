import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import {Text, Grey_text} from '../styled/components.js'
import OutsideClickHandler from 'react-outside-click-handler';


export default function Pie_chart(props){
  if (!props.compound || Object.keys(props.compound).length < 1)
    return(
      <Grey_text >
        Нет данных о структуре
      </Grey_text>
    )
  let [top, set_top] = useState(0)
  let [left, set_left] = useState(0)
  let [display, set_display] = useState('none')
  let [hint_content, set_hint_content] = useState('')


  const height = 170;
  const width = 170;
  const lineWidth = 15;
  const segment_distance = 0.03
  const animation_size = 25
  const compound = props.compound

  let new_begin = 0;
  let new_end = 0;
  let segments = {}
  for (let i in compound){
      new_end = Math.PI*2 * compound[i]['total'] + new_begin >  Math.PI*2 ? Math.PI*2 - segment_distance : Math.PI*2 * compound[i]['total'] + new_begin
      segments[i] = [new_begin, new_end, lineWidth, compound[i]['color']]
      new_begin = new_end + segment_distance
  }
  let [segmenst_state, set_segments] = useState(segments)
  if (props.compound.length == 0)
    return(
      <div/>
    )
  const legend = Object.values(props.compound).map((i) =>
  <Legend_elemen key={i.view} name={i.view} value = {i.total} color={i.color} />
 );

  return (
    <div className='row justify-content-between'>
      <Grey_text >
        Структура
      </Grey_text>
      <Hint display={display} top ={top} left = {left} hint_content = {hint_content}/>
        <div className = 'col-6 p-0' onClick={(e) => MouseClicHendler(e)} onMouseMove ={(e) => MouseMoveHendler(e)}>
          <OutsideClickHandler onOutsideClick = {() => {set_display('none')}}>
            <Canvas
              height={height}
              width ={width}
              lineWidth = {lineWidth}
              animation_size = {animation_size}
              segment_distance={segment_distance}
              segmenst_state = {segmenst_state}/>
          </OutsideClickHandler>
        </div>
      <div className = 'col-12 col-sm-8 col-md-10 col-lg-5 p-0'>
        {legend}
      </div>
    </div>
  )


  function MouseClicHendler(e){
    set_display(display='none')
    let r = (height)/2
    let x = e.clientX - e.target.getBoundingClientRect()['x'] - r
    let y = e.clientY - e.target.getBoundingClientRect()['y'] - r
    r -= lineWidth
    let rad=0
    if (x*x + y*y < r*r)
      if (x*x + y*y > Math.pow(r-lineWidth, 2)){
        rad = Math.acos((r*x)/(Math.sqrt(r*r)*Math.sqrt(x*x+y*y)))
        rad = y>0 ? rad : -rad+Math.PI*2
        for (let i in segments){
          if(segments[i][1]>=rad  && segments[i][0]<=rad) {
             show_hint(compound[i]['sub'], e.clientX, e.clientY)
          }
        }
      }
  }

  function MouseMoveHendler(e){
    let r = (height)/2
    let x = e.clientX - e.target.getBoundingClientRect()['x'] - r
    let y = e.clientY - e.target.getBoundingClientRect()['y'] - r
    r -= lineWidth
    let rad=0
    if (x*x + y*y < Math.pow(r, 2))
      if (x*x + y*y > Math.pow(r-lineWidth, 2)){
        rad = Math.acos((r*x)/(Math.sqrt(r*r)*Math.sqrt(x*x+y*y)))
        rad = y>0 ? rad : -rad+Math.PI*2
        for (let i in segments){
          if(segments[i][1]>=rad  && segments[i][0]<=rad) {
            const copy  = Object.assign({}, segments)
            copy[i][2] = animation_size
            set_segments(copy)
          }
          else{
            const copy  = Object.assign({}, segments)
            copy[i][2] = lineWidth
            set_segments(copy)
          }
        }
      }
      else {
        for (let i in segments){
          const copy  = Object.assign({}, segments)
          copy[i][2] = lineWidth
          set_segments(copy)
        }
      }
    else {
      for (let i in segments){
        const copy  = Object.assign({}, segments)
        copy[i][2] = lineWidth
        set_segments(copy)
      }
    }
  }

  function show_hint(sub, x, y){
    if (Object.keys(sub).length !== 0) {
      set_top(top=y)
      set_left(left=x)
      set_hint_content(hint_content=Object.entries(sub).map(i =>
        <Hint_elemen key={i[0]} sub={`${i[0]} - ${i[1]}`}/>
      ))
      set_display(display='block')
    }
  }

}

function Hint(props){

  const styles = {
    container:{
      'width':'130px',
      position: 'absolute',
      'zIndex': '1',
      border: '1px solid #b3c9ce',
      'borderRadius': '4px',
      'textAlign': 'center',
      font: 'italic',
      color: '#333',
      background: '#fff',
      'boxShadow': '3px 3px 3px rgba(0, 0, 0, .3)',
      'display': props.display,
      'top': props.top,
      'left': props.left,
    }
  }
    return (
      <div style = {styles.container}>
        {props.hint_content}
      </div>
    )
}


const Canvas = (props = {}) => {
  let height = props.height;
  let width = props.width;
  const style = {height, width};
  const lineWidth = props.lineWidth
  const animation_size = props.animation_size
  const segment_distance = props.segment_distance
  let segments = props.segments

  const canvas = useRef(null);


  useEffect(() => {
    const context = canvas.current.getContext("2d");
    let new_begin = 0
    let new_end  = 0
    context.clearRect(0,0, 340,340)
    for (let i in props.segmenst_state){
        context.beginPath();
        context.arc(height/2 , width/2, height/2-animation_size+(props.segmenst_state[i][2]-lineWidth), props.segmenst_state[i][0] , props.segmenst_state[i][1], false);
        context.lineWidth = props.segmenst_state[i][2];
        context.strokeStyle = props.segmenst_state[i][3];
        context.stroke();
    }
  },[props.segmenst_state]);

  return <canvas ref={canvas} height={height} width={width} style={style}/>;
};


function Legend_elemen(props){
  const styles = {
    image:{
      'background': props.color,
      'width': '9px',
      'height': '9px',
      'borderRadius': '9px',
    }

  };
    return (
      <div className='row align-items-center justify-content-end mb-1 p-0'>
        <div style={styles.image} className='col-1 p-0'></div>
        <Text fs='16px' className='col-11 ps-1'>{props.value * 100}% {props.name}</Text>
      </div>
    )
}


function Hint_elemen(props){
  const styles = {
    sub_name:{
      'fontFamily': 'Geometria',
      'fontStyle': 'normal',
      'fontWeight': '400',
      'fontSize': '14px',
      'lineHeight': '130%',
      'color': '#161414',
    }

  };
    return (
      <div className='' style={styles.sub_name}>
        {props.sub}
      </div>
    )
}
