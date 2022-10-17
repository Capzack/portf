import React, {useState, Fragment } from 'react';
import ReactDom from 'react-dom'
import {ThemeProvider} from 'styled-components';
import { useMediaQuery } from 'react-responsive'


import Header from './Components/Header.js'
import Footer from './Components/Footer.js'
import Router_component from './Components/Router_component.js'
import GlobalStyle from './globalStyles.js';
import unregister from './http/intercept.js'
import {lightTheme, darkTheme} from './styled/themes.js'
import {Page_container} from './styled/components.js'

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  let [auth, set_auth] = useState(Boolean(localStorage.getItem('access')))

  let theme_obj = lightTheme
  if (localStorage.getItem('theme') == 'darkTheme')
    theme_obj = darkTheme
  let [theme, setTheme] = useState(theme_obj)

  return (
    <Fragment>
      <ThemeProvider theme={theme} isMobile={isMobile}>
        <GlobalStyle />
        <Header auth={auth} isMobile={isMobile}/>
        <Page_container isMobile={isMobile}>
            <Router_component auth={auth} set_auth={set_auth} setTheme={setTheme} isMobile={isMobile}/>
        </Page_container>
        {isMobile && <Footer/>}
      </ThemeProvider>
    </Fragment>
  );
}


ReactDom.render(
  <App />,
  document.getElementById('root')
)
