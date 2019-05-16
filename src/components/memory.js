import React from 'react';
import {connect} from 'react-redux';
import MemoryCard from './memorycard';

class Memory extends React.Component {
  render () {
    return (
      <div>
        <div className='header'>
          <h1 className='h1'>{this.props.activeMemory.title}</h1>
        </div>
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
export default connect(mapStateToProps)(Memory);
