import React from 'react';
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class NavBar extends React.Component {

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.props.dispatch({type: 'log_out', payload: null})
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='NavBar'>
        <ul className='nav-ul'>
          {this.props.activeUser === null ?
          (<div className='nav-ul'>
            <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/login'>Log-In</NavLink>
            </div>
          </li>
          <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/signup'>Sign Up</NavLink>
            </div>
          </li>
          </div>) :
          (<div className='nav-ul'>
            <li className='nav-li'>
              <div className='nav'>
                <NavLink className='nav-button' to='/'>Home</NavLink>
              </div>
            </li>
            <li className='nav-li'>
              <div className='nav'>
                <NavLink className='nav-button' to='/memories'>Memories</NavLink>
              </div>
            </li>
            <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/profile'>Profile</NavLink>
            </div>
          </li>
          <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' onClick={this.logoutHandler} to='/'>Log-Out</NavLink>
            </div>
          </li>
          </div>)
        }
        </ul>
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
export default withRouter(connect(mapStateToProps)(NavBar));
