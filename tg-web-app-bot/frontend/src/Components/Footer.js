import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'


import ChatImg from '../media/chat.svg'
import SearchImg from '../media/search.svg'
import {WhiteText} from '../style/styled.js'

export default function Footer(props){
  const dispatch = useDispatch()

  const chagePage = (dispatch, action) => {
    return () => {
      dispatch(action)
      dispatch({type: 'HIDE_MODAL'})
    }
  }

    return(
      <FooterContainer>
        <СhatsBtn onClickHeandler={chagePage(dispatch, {type: 'ToChatPage'})}/>
        <SearchBtn onClickHeandler={chagePage(dispatch, {type: 'ToSearchPage'})}/>
      </FooterContainer>
    )
}


function СhatsBtn(props){

  return(
    <NavElem onClick={props.onClickHeandler}>
      <ChatText afterWidth='32' afterHeight='25' fs='20'>
        Чаты
      </ChatText>
    </NavElem>
  )
}

function SearchBtn(props){
  const dispatch = useDispatch()
  return(
    <NavElem onClick={props.onClickHeandler}>
      <SearchText afterWidth='25' afterHeight='26' fs='20'>
        Поиск
      </SearchText>
    </NavElem>
  )
}


const NavElem = styled.div`
  background-color: #6B80A5;
  border-radius: 10px;
  padding: calc(0.5vh + 10px) 2.5vw;
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 150dpi) {
    border-radius: 15px;
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 200dpi) {
    border-radius: 20px;
  }
  @media (-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 250dpi) {
    border-radius: 25px;
  }
`

const NavText = styled(WhiteText)`
  font-weight: 700;
  margin-bottom: 0px;
  text-align: center;
  display: inline-flex;
  ::after{
    vertical-align: middle;
    content: "";
    display: inline-block;
    background-repeat: no-repeat;
    width: ${props=>props.afterWidth + 'px'};
    height: ${props=>props.afterHeight + 'px'};
    background-size: ${props=>props.afterWidth + 'px'}, ${props=>props.afterHeight + 'px'};
    @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 150dpi) {
      width: ${props=>props.afterWidth*1.5 + 'px'};
      height: ${props=>props.afterHeight*1.5 + 'px'};
      background-size: ${props=>props.afterWidth*1.5 + 'px'}, ${props=>props.afterHeight*1.5 + 'px'};
    }
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 200dpi) {
      width: ${props=>props.afterWidth*2 + 'px'};
      height: ${props=>props.afterHeight*2 + 'px'};
      background-size: ${props=>props.afterWidth*2 + 'px'}, ${props=>props.afterHeight*2 + 'px'};
    }
    @media (-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 250dpi) {
      width: ${props=>props.afterWidth*2.5 + 'px'};
      height: ${props=>props.afterHeight*2.5 + 'px'};
      background-size: ${props=>props.afterWidth*2.5 + 'px'}, ${props=>props.afterHeight*2.5 + 'px'};
    }
  }
`

const ChatText = styled(NavText)`
  ::after{
    margin-left: 13px;
    background-image: url(${ChatImg});
  }
`

const SearchText = styled(NavText)`
  ::after{
    margin-left: 10px;
    background-image: url(${SearchImg});
  }
`

const FooterContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #F2F2F2;
  border-top: 1px solid #6B80A5;
  border-radius: 10px 10px 0px 0px;
  padding: 2vh 4vw;
  margin-top: -10px;
  height: 10vh;
`
