import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const initialState = {
  users: [],
  activeUser: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'all_users':
      return {...state, users: action.payload}
    case 'sign_in':
      return {...state, activeUser: action.payload}
    case 'log_out':
      return {...state, activeUser: action.payload}
    case 'edit_user':
      return {...state, activeUser: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
