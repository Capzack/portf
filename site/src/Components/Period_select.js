import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import {Grey_text, Select} from '../styled/components.js'

export default function Period_select(props){
  let Options
  if (props.options){
    Options = Object.keys(props.options).map(k =>
      <option key = {k} value = {k}>{k.toLowerCase()}</option>
    )
  }
  else
    return(
      <div/>
    )

  return(
    <div onClick = {e => onClickHeandler(e)} fs = {props.fs} className='d-flex align-items-end'>
      <Grey_text className='d-inline me-1'>
        {props.select + ' '}
        <Select
          className='d-inline'
          onChange={e=> ChangeHamdler(e)}
        >
          {Options}
          </Select>
      </Grey_text>
    </div>
  )

  function ChangeHamdler(e){
    if (props.points_options)
      props.set_points(props.points_options[e.target.value])
    props.set_income(props.options[e.target.value])
  }
}

function onClickHeandler(e){
  e.preventDefault()
}
