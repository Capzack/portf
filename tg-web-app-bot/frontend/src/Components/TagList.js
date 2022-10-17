import styled from 'styled-components'

import {DarkText} from '../style/styled.js'

export default function TagList(props){
  if (props.tagList)
    return(
      <div style={{display:'inline-block'}}>
        {props.tagList.map((v, i)=>
          <TagContainer key = {i}><DarkText fs='18'>{v}</DarkText></TagContainer>
        )}
      </div>
    )
}

export const TagContainer = styled.div`
  display: inline-block;
  border-radius: 10px;
  background-color: #D9D9D9;
  text-align: center;
  padding: 6px 13px;
  margin:0 7px 9px 0;
`
