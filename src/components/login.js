import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message)
      } else {
      localStorage.setItem('token', data.token)
      this.props.dispatch({type: 'sign_in', payload: data.user})
      this.props.history.push('/profile')
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='username' onChange={this.changeHandler} value={this.state.username} placeholder='Username'/>
          <input type='password' name='password' onChange={this.changeHandler} value={this.state.password} placeholder='Password'/>
          <button>Log-In</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}
export default withRouter(connect(mapStateToProps)(Login));
