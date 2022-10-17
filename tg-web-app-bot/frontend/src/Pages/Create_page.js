import {useState} from 'react'

import {Container, DiscriptionTextArea, PageHeading, Input, DarkText, ContributionInput, AddTagButton, TagInput} from '../style/styled.js'

import Select from '../Components/Select.js'
import TagList from '../Components/TagList.js'

const countryOptions = ['Россия', 'Малороссия', 'Загнивающий запад']
const sityOptions = ['Москва', 'Винница', 'Нью-Йорк']


export default function Create(props){
  const [country, setCountry] = useState(countryOptions[0])
  const [sity, setSity] = useState(sityOptions[0])
  const [tagList, setTaglist] = useState([])
  const [newTag, setNewTag] = useState('')
  const [tagInputState, setTagInputState] = useState('add')

  function tagBtnClickHandler(e){
    if(tagInputState == 'add'){
      setTagInputState('input')
    }
    else if(tagInputState == 'input'){
      if (newTag.trim()){
        setTaglist([...tagList, newTag.trim()])
        setNewTag('')
        setTagInputState('add')
      }
    }
  }

  return(
      <Container margin='0 8%'>
        <PageHeading>
          Создание заявки
        </PageHeading>
        <Container margin='4vh 0 3.5vh'>
          <DarkText fs='18'>
            <label htmlFor='Name'>Название:</label>
          </DarkText>
          <DarkText fs='16'>
            <Input type = 'text' id = 'Name' placeholder = 'Название заявки'/>
          </DarkText>
        </Container>
        <Container margin='0 0 1.4vh'>
          <Select
            fs = '18'
            id = 'country'
            label = 'Страна'
            options = {countryOptions}
            setState = {setCountry}
            inline = {true}
          />
        </Container>
        <Container margin='0 0 1.4vh'>
          <Select
            fs = '18'
            id = 'sity'
            label = 'Город'
            options = {sityOptions}
            setState = {setSity}
            inline = {true}
          />
        </Container>
        <Container margin='0 0 1.5vh'>
          <DarkText fs='18'>
            <label htmlFor = 'contribution'>Начальный взнос</label>
            <ContributionInput placeholder='1000₽' id ='contribution'/>
          </DarkText>
        </Container>
          <DarkText fs ='18'>Теги:</DarkText>
          <Container margin='1.7vh 0 1.vh'>
            <AddTagButton onClick={(e)=>{tagBtnClickHandler(e)}}>
              <DarkText fs ='18'>
                {tagInputState == 'add' ? 'Новый тег...' : 'Добавить'}
              </DarkText>
            </AddTagButton>
            <DarkText fs ='18' style={{display:'inline-block'}}>
              <TagInput
                display={tagInputState == 'input' ? 'inline-block' : 'none'}
                value={newTag} onChange={(e)=>{setNewTag(e.target.value)}}
                placeholder='Новый тег'
              />
            </DarkText>
            <TagList tagList={tagList}/>
          </Container>
          <DarkText fs ='18'>Описание:</DarkText>
          <Container margin='1.5vh 0 0' padding='0 1vw'>
            <DarkText>
              <DiscriptionTextArea/>
            </DarkText>
          </Container>
        </Container>
  )
}
