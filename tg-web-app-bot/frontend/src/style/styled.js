import styled from 'styled-components'


//Global

export const AdaptHeading = styled.h1`
  font-size: ${props=> props.fs? props.fs + 'px' : '2rem'};
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
    font-size: ${props=> props.fs? props.fs*1.5 + 'px' : '3rem'};
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 200dpi) {
    font-size:${props=>props.fs? props.fs*2 + 'px' : '4rem'};
  }
  @media (-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 250dpi) {
    font-size: ${props=> props.fs? props.fs*2.5 + 'px' : '5rem'};
}
`

export const PageHeading = styled(AdaptHeading)`
  font-weight: 400;
  margin: 3vh 0 0;
`

export const AdaptText =styled.p`
  margin: 0;
  font-size: ${props=> props.fs? props.fs + 'px' : '1rem'};
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
    font-size: ${props=> props.fs? props.fs*1.5 + 'px' : '1.5rem'};
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 200dpi) {
    font-size:${props=>props.fs? props.fs*2 + 'px' : '2rem'};
  }
  @media (-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 250dpi) {
    font-size: ${props=> props.fs? props.fs*2.5 + 'px' : '2.5rem'};
  }
`

export const WhiteText = styled(AdaptText)`
  color: #FFFFFF;
`

export const DarkText = styled(AdaptText)`
  color: #333333;
`

export const AdaptImg = styled.img`
  width: ${props=> props.width + 'px'};
  height: ${props=> props.height + 'px'};
  object-fit: cover;
  object-position: 50%;
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
    width: ${props=> props.width*1.5 + 'px'};
    height: ${props=> props.height*1.5 + 'px'};
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 200dpi) {
    width: ${props=> props.width*2 + 'px'};
    height: ${props=> props.height*2 + 'px'};
  }
  @media (-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 250dpi) {
    width: ${props=> props.width*2.5 + 'px'};
    height: ${props=> props.height*2.5 + 'px'};
  }
`

export const ModalHeading = styled(PageHeading)`
  text-align: center;
  margin: 0 60px 15px;
`

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

//Search Page

export const Container = styled.div`
  margin: ${props=>props.margin || '0'};
  padding: ${props=>props.padding || '0'};
  background-color: ${props=>props.bg || 'inherit'};
`

export const SelectsContainer = styled(FlexBox)`
  margin: 1.37vh 0 2.25vh;
`


export const GropupItem = styled.li`
  padding: 2vh 0;
  :nth-child(odd){
    background: #F2F2F2;
    color: #4072CB;
  }
  :nth-child(even){
    background-color: #839BC6;

    color: #FFFFFF;
  }
`

export const RequestItem = styled.article`
  background-color: ${props=> props.color};
  border-radius: 15px;
  padding: 0.8vh 3vw 0.8vh 5vw;
  margin-bottom: 1vh;
  :last-child{
    margin-bottom: 0;
  }
`

export const RequestHeading = styled(AdaptHeading)`
  font-weight: 700;
`

export const ContributionContainer = styled.div`
  border-radius: 15px;
  background-color: #839BC6;
  text-align: center;
  padding: 8px 0;
  margin-bottom: 14px;
`


export const Discription = styled(AdaptText)`
  margin-top: 8px 0 15px;
  text-align: justify;
`

//Create Page

export const Input = styled.input`
  margin-top: 1vh;
  background-color:#D9D9D9;
  width: 100%;
  text-align: center;
  height: 5.5vh;
  border-radius: 15px;
  border: none;
`

export const ContributionInput = styled.input`
  background: #6B80A5;
  border-radius: 15px;
  color: #FFFFFF;
  float: right;
  width: 40vw;
  text-align: center;
  border: none;
  padding: 1px;
  ::placeholder{
    color: #FFFFFF;
    opacity: 0.7;
  }
`

export const AddTagButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 10px;
  background-color: #D9D9D9;
  text-align: center;
  padding: 6px 13px;
  margin:0 7px 9px 0;
`
export const TagInput = styled.input`
  display: ${props=>props.display || 'inline-block'};
  border: none;
  border-radius: 10px;
  background-color: #D9D9D9;
  text-align: center;
  padding: 6px 13px;
  margin:0 7px 9px 0;
  width: 25vw;
`

export const DiscriptionTextArea = styled.textarea`
  width: 100%;
  height: 30vh;
  border: none;
  background-color: #D9D9D9;
  border-radius: 15px;
  padding: 2vw;
  :active, :hover, :focus {
      outline: 0;
      outline-offset: 0;
  }
`
