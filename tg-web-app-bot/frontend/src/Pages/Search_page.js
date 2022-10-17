import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import {WhiteText, DarkText, AdaptText, PageHeading, Container, SelectsContainer, List, GropupItem, RequestItem, AdaptHeading, RequestDiscription, ModalHeading, FlexBox, ContributionContainer} from '../style/styled.js'

import Select from '../Components/Select.js'
import Dropdown from '../Components/Dropdown.js'
import Modal from '../Components/Modal.js'
import UserFrame from '../Components/UserFrame.js'
import TagList from '../Components/TagList.js'

import {getRequestInfo} from '../http/Requests.js'

const sortOptions = ['дате', 'названию']
const groupOptions = ['локации', 'еще что-то']
const requests = [
  {
    title: 'Мсоква',
    orders: [
      {
        id: 1,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
      {
        id: 2,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
    ]
  },
  {
    title: 'Мсоква',
    orders: [
      {
        id: 1,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
      {
        id: 2,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
    ]
  },
  {
    title: 'Мсоква',
    orders: [
      {
        id: 1,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
      {
        id: 2,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
    ]
  },
  {
    title: 'Мсоква',
    orders: [
      {
        id: 3,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
      {
        id: 4,
        name: 'Название',
        discription: 'Первые несколько строк описания. Первые несколько строк описания....'
      },
    ]
  },
]

export default function Search(props){
  const dispatch = useDispatch()
  const modalDisplay = useSelector(state => state.modalDisplay)

  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [groupBy, setGroupBy] = useState(groupOptions[0])
  const [openRequestId, setOpenRequestId] = useState(null)

  function requestsListClickHandler(e){
    let id = null
    if(e.target.localName == 'article')
      id = e.target.id
    else if (e.target.parentElement.localName == 'article')
      id = e.target.parentElement.id
    if (id){
      setOpenRequestId(id)
      dispatch({type:'SHOW_MODAL'})
    }
  }

  return(
    <div>
      <Container margin='0 8%'>
        <PageHeading fs='36'>
          Поиск
        </PageHeading>
        <SelectsContainer>
          <Select
            id = 'sort'
            label = 'сортировать по'
            options = {sortOptions}
            setState = {setGroupBy}
            inline = {false}
          />
          <Select
            id = 'group'
            label = 'группировать по'
            options = {groupOptions}
            setState = {setSortBy}
            inline = {false}
          />
        </SelectsContainer>
      </Container>
      <div onClick = {(e)=>{requestsListClickHandler(e)}}>
        <RequestsList requests = {requests}/>
      </div>
      <Modal
        display = {modalDisplay}
        //TODO вытащить в компонент
        content ={<ModalContent requestId = {openRequestId}/>}
      />
    </div>
  )
}
//TODO рефактор этого говна(вынести в переменные вю хуйню)
//TODO Обернуть в лоадинг и прикрутить анимацию
//TODO Добавить key когда будет связка с беком
function RequestsList(props){
  return(
    <List>
      {props.requests.map((v, i)=>{
        return (
          <GropupItem key = {i}>
            <Container margin='0 8%'>
              <Dropdown
                title ={v.title}
                titleFS = '18'
                HeadingColor = {i % 2 == 0 ? '#535D6F' : '#FFFFFF'}
                content =
                  <List>
                    {v.orders.map((v)=>{
                      return(
                        <RequestItem key = {v.id} id = {v.id} color = {i % 2 == 0 ? '#D9D9D9' : '#6B80A5'}>
                          <AdaptHeading fs='15'>
                            {v.name}
                          </AdaptHeading>
                          <AdaptText fs='14'>
                            {v.discription}
                          </AdaptText>
                        </RequestItem>
                      )
                    })}
                  </List>
              />
            </Container>
          </GropupItem>
        )
      })}
    </List>
  )
}


function ModalContent(props){
  const [requestInfo, setRequestInfo] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(false)
    if (props.requestId)
      getRequestInfo(props.requestId)
      .then(result => {
        setRequestInfo(result)
        setLoading(true)
      })
  },[props.requestId])

  if (!loading)
    return(
      <div>
        Загрузка...
      </div>
    )
  return(
    <div>
      <ModalHeading fs='32'>
        {requestInfo.name} №{requestInfo.id}
      </ModalHeading>
      <Container margin='0 8%'>
        <FlexBox>
          <DarkText>создана: {requestInfo.create}</DarkText>
          <DarkText>{requestInfo.location}</DarkText>
        </FlexBox>
        <ContributionContainer>
          <WhiteText>
            Взнос {requestInfo.contribution}₽
          </WhiteText>
        </ContributionContainer>
        <TagList tagList={requestInfo.tagList}/>
          <DarkText fs='15'>{requestInfo.discription}</DarkText>
      </Container>
      <Container bg = '#839BC6;' padding='12px 8% 25px'>
          <WhiteText fs='20'>Участники ({requestInfo.users.length}/100):</WhiteText>
          {requestInfo.users.map((v, i)=>
            <UserFrame key={i} user ={v}/>
          )}
      </Container>
    </div>
  )
}
