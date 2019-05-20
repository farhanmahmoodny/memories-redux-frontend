import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
  render() {
    return(
      <div>
        <div className='header'>
          <h1 className='h1'>Home</h1>
        </div>
        <div className="content">
          <h1>Memories</h1>
          <h3>A Way To Remember All The Fun That Was Had...</h3>
          {this.props.activeUser ? null : <h5>Please Sign-Up or Log-In</h5>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}
export default connect(mapStateToProps)(Home);
