import styled, {keyframes} from 'styled-components'
import {useState} from 'react'

import Triangle from '../media/triangle.svg'
import {AdaptText} from '../style/styled.js'

export default function Dropdown(props){
  const [isContentShow, setIsContentShow] = useState(true)
  function ListHeadingOnClickHeandler(e){
    e.stopPropagation()
    setIsContentShow(!isContentShow)
  }


  if (props.content){
    return(
      <div>
        <ListHeading
          fs={props.titleFS}
          onClick={e=>{ListHeadingOnClickHeandler(e)}}
          isContentShow={isContentShow}
          color = {props.HeadingColor}
        >
          {props.title}
        </ListHeading>
        <ContentCopntainer>
          <AnimationWraper isShow = {isContentShow}>
            {props.content}
          </AnimationWraper>
        </ContentCopntainer>
      </div>
    )
  }
}

const showContent = keyframes`
  0% {
    transform: translateY(-100%) scaleY(0);
    height: 0px;
  }
  100% {
    transform: translateY(0) scaleY(1);
    height: auto;
  }
`

const hideContent = keyframes`
  0% {
    transform: translateY(0) scaleY(1);
    height: auto;

  }
  100% {
    transform: translateY(-100%) scaleY(0);
    height: 0px;

  }
`

const AnimationWraper = styled.div`
  animation: ${props=> props.isShow ?  showContent : hideContent} 1s forwards;
`

const ContentCopntainer = styled.div`
  overflow: hidden;
`


const ListHeading = styled(AdaptText)`
  font-weight: 400;
  font-style: normal;
  margin-bottom: ${props=> props.isContentShow ? '18px' : '0'};
  transition: margin 1s;
  cursor: default;
  color: ${props=> props.color};
  ::before{
    content: "";
    display: inline-block;
    background-image: url(${Triangle});
    background-repeat: no-repeat;
    transform: rotate(${props=> props.isContentShow ? '0' : '-90deg'});
    transition: transform 1s;
    margin-right: 5px;
    height:15px;
    width:20px;
    background-size: 20px 15px;
    margin-left: -25px;
    @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
      margin-right: 7.5px;
      height:22.5px;
      width:30px;
      background-size: 30px 22.5px;
      margin-left: -37.5px;
    }
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 200dpi) {
      margin-right: 10px;
      height:30px;
      width:40px;
      background-size: 40px 30px;
      margin-left: -50px;
    }
    @media (-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 250dpi) {
      margin-right:  12.5px;
      height:37.5px;
      width:50px;
      background-size: 50px 37.5px;
      margin-left: -62.5px;
    }
    filter: ${props=> props.color == '#FFFFFF'? 'brightness(0) invert(1)' : ''};
`
