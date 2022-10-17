import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${props => props.theme.main_bg};
    font-family: Geometria;
    font-style: normal;
    color: #161414;
    min-height:100vh;
  }
`;

export default GlobalStyle;
