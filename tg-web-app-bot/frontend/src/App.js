import React, {Fragment, useState, useEffect} from 'react';
import ReactDom from 'react-dom'
import './App.css';

import {Provider} from 'react-redux'
import {store} from './store'
import {useSelector, useDispatch} from 'react-redux'

import {GlobalStyle} from './style/globalStyle.js'

import Create from './Pages/Create_page.js'
import SearchPage from './Pages/Search_page.js'
import ChatPage from './Pages/Chat_page.js'

import Footer from './Components/Footer.js'


export default function App() {
    return(
      <Fragment>
        <Provider store={store}>
          <GlobalStyle/>
          <PageContent/>
          {/* <Create/> */}

          <Footer/>
        </Provider>
      </Fragment>
    )
}

function PageContent(prors){
  const route = useSelector(state => state.route)
  switch (route.page){
    case 'SearchPage':
      console.log(123)
      return <SearchPage/>
    case 'ChatPage':
      return <ChatPage/>
  }
}
