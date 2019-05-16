import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/signup';
import Login from './components/login';
import NavBar from './components/navbar';
import Profile from './components/profile';
import './App.css';

class App extends React.Component {

  // componentDidMount() {
  //   const token = localStorage.getItem("token")
  //    if (token) {
  //      fetch('http://localhost:3000/get_user', {
  //        method: 'GET',
  //        headers: {
  //         Authorization: token
  //        }
  //      })
  //     .then(response => response.json())
  //     .then(data => this.props.dispatch({type: 'sign_in', payload: data.user}))
  //   }
  // }
  render() {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path='/' render={() => (<Home />) }/>
        <Route exact path='/signup' render={() => (<SignUp />) }/>
        <Route exact path='/login' render={() => (<Login />) }/>
        <Route exact path='/profile' render={() => (<Profile />)} />
      </Switch>
    </div>
  )}
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}
export default connect(mapStateToProps)(App);
