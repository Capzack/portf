import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'


export default function Modal(props){
  const dispatch = useDispatch()
  const modalDisplay = useSelector(state => state.modalDisplay)

  return(
    <ModalStyle display ={modalDisplay}>
      <div>
        <ModalWindow>
          <CloseBtn onClick={(e)=>{dispatch({type:'HIDE_MODAL'})}}/>
          {props.content}
        </ModalWindow>
      </div>
    </ModalStyle>
  )
}

const ModalStyle = styled.div`
  position: fixed;
  z-index: 5;
  display: ${props => props.display};
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`

const ModalWindow = styled.div`
  background-color: #FFFFFF;
  border-radius: 40px;
  position: absolute;
  top: 52%;
  left: 50%;
  width: 92%;
  height: 96%;
  transform: translate(-50%, -50vh);
  padding-top: 4%;
  overflow: overlay;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`

const CloseBtn = styled.div`
  position: absolute;
  width: 5vw;
  height: 5vw;
  min-width: 25px;
  max-width: 50px;
  min-height: 25px;
  max-height: 50px;
  border-radius: 50%;
  background-color: #D9D9D9;
  top:20px;
  right: 20px;
  ::after, ::before{
    position: absolute;
    left: calc(50% - 1px);
    top:15%;
    content: ' ';
    height: 70%;
    width: 2px;
    background-color: #333;
  }
  ::after{
    transform: rotate(-45deg);
  }
  ::before{
    transform: rotate(45deg);
  }
`
