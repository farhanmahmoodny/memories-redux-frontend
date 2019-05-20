import React from 'react';
import {connect} from 'react-redux';

class PhotoCard extends React.Component {

  state = {

  }

  render() {
    return (
      <div className='photoCard'>
        <h5 className='photoCard-title'>{this.props.photo.location}</h5>
        <img className='photoCard-image' src={this.props.photo.image} alt="not working"/>
        <p className='photoCard-description'>{this.props.photo.description}</p>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeMemory: state.activeMemory,
    activeUser: state.activeUser
  }
}
export default connect(mapStateToProps)(PhotoCard);
