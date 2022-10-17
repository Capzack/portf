import React from 'react';
import styled from 'styled-components'

import Income_image from '../media/images/Income.svg'

export default function Income(props){
  return(
    <Income_style padding = {props.padding} income = {props.income}  className="text-center">
      {props.income}%
      <Image className ='ms-2' src={Income_image} income = {props.income}/>
    </Income_style>
  )
}

const Income_style = styled.div`
  background: ${props => props.income > 0 ? '#31a68a' : '#D92B45'};
  border-radius: 27px;
  padding: ${props => props.padding || '4px'};
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #FFFFFF;
  max-width: 100px;
`

const Image = styled.img`
  transform: ${props => props.income > 0 ? 'rotate(-90deg)' : 'rotate(0deg)'};
  height: 0.8em;
`
