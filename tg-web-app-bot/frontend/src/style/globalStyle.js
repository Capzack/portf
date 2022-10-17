import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background: #FFFFFF;
    font-family: 'Inter';
    color: #333333;
    font-style: normal;
    padding-bottom: calc(10vh - 10px);
  }

  *{
      padding:0;
      margin:0;
  }
`
