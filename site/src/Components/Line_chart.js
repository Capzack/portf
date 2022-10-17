import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import {Theme_shadow_block, Text, Grey_text} from '../styled/components.js'
import Period_select from '../Components/Period_select.js'

let left_points = []
let rigth_points = []

export default function Line_chart(props){
  if (!props.data || props.data.length < 2)
    return(
      <Grey_text >
        Торгов еще не было
      </Grey_text>
    )
  const myRef = useRef();
  const lineWidth = 2;
  const height = 350;
  let [width, set_width] = useState(550)
  let [dragging, set_dragging] = useState(false)
  let [clientX, set_clientX] = useState(0)
  let [view_points, set_view_points] = useState(props.data)



  useEffect(() => {
    document.body.addEventListener("mouseup", MouseUpHeadler);
  })

  return (
    <Shadow_block className='col-12'>
      <div className='row' onMouseDown={e=>MouseDowndHeadler(e)}>
        <div ref = {myRef} className='col-12 p-0'>
          <Canvas
            clientX ={clientX}
            set_clientX ={set_clientX}
            dragging={dragging}
            onWheel={WhellHendler}
            parent = {myRef}
            lineWidth={lineWidth}
            height={height}
            width={width}
            set_width={set_width}
            view_points={view_points}
            set_view_points={set_view_points}
          />
        </div>
      </div>
    </Shadow_block>
  )


  function MouseUpHeadler(e){
    set_dragging(false)
  }


  function MouseDowndHeadler(e){
    set_dragging(true)
    set_clientX(e.clientX)
  }


  function WhellHendler(e){
    if (e.deltaY > 0){
      if (left_points.length>0){
        set_view_points(view_points=> [...left_points.splice(-(view_points.length*0.05).toFixed()), ...view_points])
      }

    }
    else if (e.deltaY < 0){
      if (view_points.length>10){
        let tmp = Object.assign(view_points)
        left_points.push(...tmp.splice(0, (tmp.length*0.05).toFixed()))
        set_view_points(tmp.filter(()=>true))
      }
    }
  }
}


const Canvas = (props = {}) => {
  const canvas = useRef(null);
  let [grid_Y, set_grid_Y] = useState({})
  let [grid_X, set_grid_X
  ] = useState({})
  let ymin = Infinity
  let ymax = -Infinity
  props.view_points.forEach((i) => {
    ymin = i[1] < ymin ? i[1] : ymin
    ymax = i[1] > ymax ? i[1] : ymax
  })
  let [deltaY, set_deltaY] = useState(ymax-ymin)



  useEffect(() => {
    props.parent.current.addEventListener('wheel', e => e.preventDefault(), {passive:false})
    props.set_width(props.parent.current.clientWidth-40)

    let deltaX = props.view_points.slice(-1)[0][0] - props.view_points[0][0]

    let ymin = Infinity
    let ymax = -Infinity

    props.view_points.forEach((i) => {
      ymin = i[1] < ymin ? i[1] : ymin
      ymax = i[1] > ymax ? i[1] : ymax
    })

    set_deltaY(ymax-ymin)
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, props.width, props.height)
    context.beginPath();
    context.moveTo(0, props.height*(ymax-props.view_points[0][1])/deltaY)
    for (let i = 1; i < props.view_points.length; i++){
      context.lineTo(
        props.width*(props.view_points[i][0]-props.view_points[0][0])/deltaX,
        props.height*(ymax-props.view_points[i][1])/deltaY);
      //console.log(canvas.current.clientWidth(props.points[i][0]-props.points[0][0])/deltaX, height(ymax-props.points[i][1])/deltaY)
    }
    context.lineWidth = props.lineWidth
    context.stroke();
    let [step, count] = get_gridY(deltaY)
    set_grid_Y({'step':step, 'count': count, 'mt': (deltaY-step*count)/2})
    for (let i = 0; i <= count; i++){
      context.moveTo(0, props.height * (grid_Y.mt + i * step) / deltaY)
      context.lineTo(props.width, props.height*(grid_Y.mt+i*step)/deltaY)
    }
    [step, count] = get_gridY(deltaX)
    set_grid_X({'step':step, 'count': count, 'mt': (deltaX-step*count)/2})
    for (let i = 0; i <= count; i++){
      context.moveTo(props.width * (grid_X.mt + i * step) / deltaX, 0)
      context.lineTo( props.width*(grid_X.mt+i*step)/deltaX, props.height)
    }
    context.lineWidth = 0.2
    context.stroke();

  },[props.view_points, props.width]);


  function get_gridY(delta){
    let step, a, digit
    if (delta>=10){
      a=delta.toFixed().toString().slice(0,2)
      digit = 1
    }
    else  {
      a=(delta*10).toFixed().toString().slice(0,2)
      digit = 10
    }
    if (a/1<=15)
      step = 1
    else if (a/2<=15)
      step = 2
    else if (a/5<=15)
      step = 5
    else
      step = 10
    step = delta>=10 ? step/digit + '0'.repeat(delta.toFixed().toString().length-2) : step/digit
    // console.log(step, Math.floor(delta/step))
    return([Number(step), Math.floor(delta/step)])

  }

  return (
      <div className='row'>
        <canvas className='col-11'
          onMouseMove={e=>MouseMoveHendler(e)}
          onWheel={e=>props.onWheel(e)}
          ref={canvas}
          height={props.height}
          width={props.width}
        />
      </div>
  )


  function MouseMoveHendler(e){
    if (props.dragging){
      if(props.clientX > e.clientX){
        if (rigth_points.length>0){
          left_points.push(props.view_points[0])
          props.set_view_points([...props.view_points, rigth_points.shift()].filter((v, i) =>
            i !== 0
          ));
        }
      }
      else if(props.clientX < e.clientX){
        if (left_points.length>0){
          rigth_points.unshift(...props.view_points.slice(-1))
          props.set_view_points([left_points.pop(), ...props.view_points].filter((v, i) =>
            i !== props.view_points.length
          ));
        }
      }
    }
  }

};



const Shadow_block = styled.div`
  box-shadow: box-shadow: -12px 12px 24px rgba(34, 35, 39, 0.2), 12px -12px 24px rgba(34, 35, 39, 0.2), -12px -12px 24px rgba(46, 47, 51, 0.9), 12px 12px 30px rgba(34, 35, 39, 0.9), inset 1px 1px 2px rgba(46, 47, 51, 0.3), inset -1px -1px 2px rgba(34, 35, 39, 0.5);
  border-radius: 24px;
  font-size: 20px;
  padding: 24px;
`

const Legend_elemen = styled.div`
  margin-left: ${props => props.margin_left || 0};
  margin-top: ${props => props.margin_top || 0};
  font-size: 10px;
  height: 0px;
`

const Xlegend_style = styled.div`
  padding-bottom: 0px;
  border-top: 1px solid;
  width: ${props => props.width || auto};
`

const Ylegend_style = styled.div`
  height: ${props => props.height || auto};
`
