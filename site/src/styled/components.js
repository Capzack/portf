import styled from 'styled-components'

export const Page_container = styled.div`
  padding-top: ${props=>props.isMobile ? '0':'80px'};
  min-height: 80vh;
`

export const Title = styled.p `
  font-style: normal;
  margin-bottom: ${props=>props.mb || 0};
  font-weight: 700;
  font-size: 36px;
  line-height: 110%;
  color: ${props => props.theme.text};
  padding: 0px;
`

export const Input = styled.input `
  background: #ECEFF8;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(208, 210, 218, 0.5), inset -3px 3px 6px rgba(208, 210, 218, 0.2), inset 3px -3px 6px rgba(208, 210, 218, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.9), inset 3px 3px 8px rgba(208, 210, 218, 0.9);
  border-radius: 16px;
  padding: 7px;
  ::placeholder{
    font-size: 16px;
    line-height: 110%;
    font-weight: 400;
    color: #28292D;
  }
`

export const Theme_input = styled(Input)`
  background: ${props => props.theme.main_bg};
  box-shadow: ${props => props.theme.search_shadow};
  ::placeholder{
    color: ${props => props.theme.text};
  }
`

export const Checkbox = styled.input`
  background: #ECEFF8;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(172, 174, 181, 0.5), inset -2px 2px 4px rgba(172, 174, 181, 0.2), inset 2px -2px 4px rgba(172, 174, 181, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.9), inset 2px 2px 5px rgba(172, 174, 181, 0.9);
  border-radius: 4px;
`

export const Text = styled.p`
  vertical-align: middle;
  font-size: ${props=> props.fs || '20px'};
  font-weight: ${props=> props.fw || '400'};
  line-height: 110%;
  color: ${props => props.theme.text};
  padding: 0;
  margin: 0;
`

export const White_text = styled.p`
  color: #ECEFF8;
  font-size: ${props=> props.fs || '24px'};
  font-weight: ${props=> props.fw || '400'};
  padding: 0;
  margin: 0;
`

export const Black_text = styled.p`
  color: #161414;
  font-size: ${props=> props.fs || '20px'};
  font-weight: ${props=> props.fw || '700'};
  padding: 0;
  margin: 0;
`

export const Red_text = styled.p`
  font-size: 16px;
  line-height: 130%;
  color: ${props=>props.is_read ? '#D92B45' : '#31A68A'};
  opacity: ${props=> props.opacity};
  padding: 0;
  margin: 0;
  vertical-align: middle;
`

export const Grey_text =styled.p`
  font-size: ${props => props.fs || '16px'};
  color: #929191;
  padding: 0;
  margin: 0;
  vertical-align: middle;
`

export const Shadow_block=styled.div`
  align-items: center;
  background: ${props => props.theme.main_bg};
  box-shadow: -3px 3px 6px rgba(210, 213, 221, 0.2), 3px -3px 6px rgba(210, 213, 221, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.9), 3px 3px 8px rgba(210, 213, 221, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(210, 213, 221, 0.5);
  border-radius: 8px;
  height: ${props=>props.height || '56px'};
  width: ${props=>props.width || '56px'};
`

export const Section = styled.div`
  background: ${props => props.theme.section_color};
  border-radius: ${props=> props.br || '32px'};
  margin: 0;

`
export const Submit_button = styled.button`
  background: #2BA3D9;
  box-shadow: -1px 1px 2px rgba(42, 158, 210, 0.2), 1px -1px 2px rgba(42, 158, 210, 0.2), -1px -1px 2px rgba(44, 168, 224, 0.9), 1px 1px 3px rgba(42, 158, 210, 0.9), inset 1px 1px 2px rgba(44, 168, 224, 0.3), inset -1px -1px 2px rgba(42, 158, 210, 0.5);
  border-radius: 16px;
  border: none;
  color: #ECEFF8;
  :disabled{
    color: #666666;
    background: #135978;
  }
`

export const Link = styled.a`
  text-decoration: none;
  padding: 0;
  margin: 0;
  &:hover{
    color: #161414;
    text-decoration: none;
  }
`

export const Theme_shadow_block = styled.div`
  box-shadow: ${props => props.theme.strategy_shadow};
  border-radius: 24px;
  background: ${props => props.theme.main_bg};
`
export const Theme_shadow_btn = styled.button`
  box-shadow: ${props => props.theme.strategy_shadow};
  background: ${props => props.theme.main_bg};
  border-radius: 24px;
  border:none;

`
export const Img = styled.img`
  margin: 0;
  width: ${props => props.width};
  height: ${props => props.height};
  max-width: ${props => props.mw};
`

export const Svg = styled(Img)`
  filter: ${props => props.filter || props.theme.svg_filter};
`

export const Bg_svg = styled.img`
  position: absolute;
  top: -10px;
  z-index:-1;
  width: 80vw;
  filter: ${props => props.theme.bg_svg_filter};
`

export const Select = styled.select`
  color: ${props => props.theme.text};
  border: 0px;
  outline: none;
  margin-left: -4px;
  background-color: rgba(0, 0, 0, 0);
  &:focus{
    background-color:${props => props.theme.main_bg};
  }
`

export const Select_shadow = styled(Select)`
  border-radius: 24px;
  box-shadow: ${props => props.theme.strategy_shadow};
  background: ${props => props.theme.main_bg};
`

export const Modal = styled.div`
  z-index: 5;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  margin:0;
  display: ${props => props.display};
`
export const Menu = styled.div`
  background: linear-gradient(135deg, #F8FBFF 0%, #E0E3EC 100%);
  box-shadow: -1px 1px 2px rgba(208, 210, 216, 0.2), 1px -1px 2px rgba(208, 210, 216, 0.2), -1px -1px 2px rgba(255, 255, 255, 0.9), 1px 1px 3px rgba(208, 210, 216, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(208, 210, 216, 0.5);
  border-radius: 32px 0px 32px 32px;
  position: fixed;
  right: 0;
  top: 0;
  left: auto;
`
