import {createStore, combineReducers} from 'redux';

import modalDisplayReducer from './modalDisplayreduser.js'
import routeReduser from './routeReduser.js'

const rootReduser  = combineReducers({
  modalDisplay: modalDisplayReducer,
  route: routeReduser,
})

export const store = createStore(rootReduser)
