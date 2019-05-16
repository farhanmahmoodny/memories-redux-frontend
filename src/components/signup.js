import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

class SignUp extends React.Component {

  state = {
    name: '',
    email: '',
    username: '',
    password: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token)
      this.props.dispatch({type: 'sign_in', payload: data.user})
      this.props.history.push('/profile')
    })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='name' onChange={this.changeHandler} placeholder='Name' value={this.state.name}/>
          <input type='text' name='email' onChange={this.changeHandler} placeholder='Email' value={this.state.email}/>
          <input type='text' name='username' onChange={this.changeHandler} placeholder='Username' value={this.state.username}/>
          <input type='password' name='password' onChange={this.changeHandler} placeholder='Password' value={this.state.password}/>
          <button>Create User</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    activeUser: state.activeUser
  }
}
export default withRouter(connect(mapStateToProps)(SignUp));
