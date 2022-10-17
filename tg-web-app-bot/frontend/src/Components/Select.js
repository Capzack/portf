import styled from 'styled-components'
import {DarkText} from '../style/styled.js'
export default function Select(props){
  return(
    <DarkText fs={props.fs || '14'}>
      <Label htmlFor = {props.id} fs='14' display={props.inline ? 'inline-block' : 'block'}>
        {props.label}
      </Label>
      <SelectStyle id={props.id}
        float = {props.inline ? 'right' : 'inherit'}
        width = {props.inline ? '40vw' : 'auto'}
        >
        {props.options.map((v, i)=>
          <Option key={i} value={v}>{v}</Option>
        )}
      </SelectStyle>
    </DarkText>
  )
}


const Label = styled.label`
  display: ${props => props.display};
  margin-bottom: 0.5vh;
  margin: 0;
`

const SelectStyle = styled.select`
  background: #6B80A5;
  border-radius: 15px;
  color: #FFFFFF;
  padding: 5px 5px 5px 19px;
  border: none;
  float: ${props=> props.float || 'inherit'};
  width: ${props=> props.width || 'auto'};
`
const Option = styled.option`
`
