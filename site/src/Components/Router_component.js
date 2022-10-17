import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


import Main_page from '../Pages/Main_page.js'
import Shop_page from '../Pages/Shop_page.js'
import Strategy_page from '../Pages/Strategy_page.js'
import History_page from '../Pages/History_page.js'
import Notifications_page from '../Pages/Notifications_page.js'
import Account_page from '../Pages/Account_page.js'
import Login_page from '../Pages/Login_page.js'
import Register_page from '../Pages/Register_page.js'
import Recover_pass_page from '../Pages/Recover_pass_page.js'
import Settings from '../Pages/Settings_page.js'
import Changepassword from '../Pages/Changepassword.js'
import Changeemail from '../Pages/Changeemail.js'
import Changenumber from '../Pages/Changenumber.js'
import Changename from '../Pages/Changename.js'
import Filter from '../Components/Filter.js'
import Activate from '../Components/Activate.js'
import Logout from '../Components/Logout.js'
import Changeimage from '../Pages/Changeimage.js'
import Changekeys from '../Pages/Changekey.js'
import Confirm_pass_reset from '../Pages/Confirm_pass_reset.js'
import Googleauth from '../Components/Googleauth.js'

export default function Router_component(props){
  return(
    <Router>
      <Routes>
        <Route exact path='/' exact element={<Main_page isMobile={props.isMobile}/>} />
        <Route exact path='/shop' exact element={<Shop_page />} />
        <Route exact path='/filter' exact element={<Filter />} />
        <Route
          exact path='/history/:strategy_id'
          element={props.auth ? <History_page id={true}/> : <Navigate to="/login" replace />}
        />
        <Route
          exact path='/history'
          element={props.auth ? <History_page id={false}/> : <Navigate to="/login" replace />}
        />
        <Route
          exact path='/notifications'
          element={props.auth ? <Notifications_page /> : <Navigate to="/login" replace />}
        />
        <Route
          exact path='/account'
          element={props.auth ? <Account_page /> : <Navigate to="/login" replace />}
        />
        <Route exact path='/strategy/:strategy_id' exact element={<Strategy_page/>} />
        <Route exact path='/login' exact element={<Login_page set_auth={props.set_auth}/>} />
        <Route exact path='/googleauth' exact element={<Googleauth set_auth={props.set_auth}/>} />

        <Route exact path='/regisration' exact element={<Register_page/>} />
        <Route exact path='/logout' exact element={<Logout set_auth={props.set_auth}/>} />
        <Route exact path='/activate/:activate_id/:token' exact element={<Activate/>}/>
        <Route exact path='/password-reset/:activate_id/:token' exact element={<Confirm_pass_reset/>}/>

        <Route exact path='/settings' exact element={<Settings setTheme ={props.setTheme}/>}/>
        <Route exact path='/recover' exact element={<Recover_pass_page/>}/>
        <Route exact path='/changepassword' exact element={<Changepassword/>}/>
        <Route exact path='/changeemail' exact element={<Changeemail/>}/>
        <Route exact path='/changenumber' exact element={<Changenumber/>}/>
        <Route exact path='/changename' exact element={<Changename/>}/>
        <Route exact path='/changeimage' exact element={<Changeimage/>}/>
        <Route exact path='/changekey' exact element={<Changekeys/>}/>
      </Routes>
    </Router>
  )
}
