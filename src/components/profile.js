import React from 'react';
import {connect} from 'react-redux';

class Profile extends React.Component {

  state = {
    name: '',
    email: '',
    username: '',
    edit: false
  }

  editHandler = () => {
    this.setState({edit: !this.state.edit})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/users/${this.props.activeUser.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        username: this.state.username
      })
    }).then(resp => resp.json())
      .then(user => {
        this.props.dispatch({type: 'edit_user', payload: user})
      })
    this.setState({edit: !this.state.edit})
  }


  render() {
    return(
      <div>
        <div className='header'>
          <h1 className='h1'>Profile</h1>
        </div>
        { !this.props.activeUser
          ? "Loading..."
          : (!this.state.edit
          ? (<div className='profile'>
            <h3 className='profile-info'>Name: {this.props.activeUser.name}</h3>
            <h3 className='profile-info'>Email: {this.props.activeUser.email}</h3>
            <h3 className='profile-info'>Username: {this.props.activeUser.username}</h3>
            <div className='profile-buttons-div'>
              <button className='profile-button' onClick={this.editHandler}>Edit</button>
            </div>
          </div>)
          : (<div>
              <form className='profile-form' onSubmit={this.submitHandler}>
                <div className='profile-div'>
                  <h3 className='profile-info'>Name:</h3>
                  <input className='profile-input' type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.changeHandler}/>
                </div>
                <div className='profile-div'>
                  <h3 className='profile-info'>Email:</h3>
                  <input className='profile-input' type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.changeHandler}/>
                </div>
                <div className='profile-div'>
                  <h3 className='profile-info'>Username:</h3>
                  <input className='profile-input' type='text' name= 'username' placeholder='Username' value={this.state.username} onChange={this.changeHandler}/>
                </div>
                <button className='profile-form-button'>Update</button>
              </form>
            </div>))
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}
export default connect(mapStateToProps)(Profile);
