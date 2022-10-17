import styled from 'styled-components'

import {AdaptImg, WhiteText} from '../style/styled.js'

export default function User(props){
  let color = '#FFFFFF'
  switch (props.user.roll){
    case 'Участник':
      color = '#FFFFFF'
      break;
    default:
      color = '#40CB4E'
  }
  return(
    <UserContainer>
      <AdaptImg width='60' height ='60' src = {props.user.img}/>
      <UserInfo>
        <Username fs='15'>{props.user.name}</Username>
        <UserRole fs='14' color={color}>{props.user.roll}</UserRole>
      </UserInfo>
    </UserContainer>
  )
}

const UserContainer = styled.div`
  border-radius: 15px;
  background-color: #6B80A5;
  overflow: hidden;
  margin-top: 10px;
`
const UserInfo = styled.div`
  display: inline-grid;
  vertical-align: middle;
  margin-left: 2.3vw;
`

const Username = styled(WhiteText)`
  font-weight: 700;
`

const UserRole = styled(WhiteText)`
  color: ${props=>props.color}
`
