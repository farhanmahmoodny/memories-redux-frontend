import React from 'react';
import {connect} from 'react-redux';
import MemoryCard from './memorycard';
import {withRouter} from 'react-router-dom';

class Memories extends React.Component {

  state = {
    title: '',
    date: '',
    add: false
  }

  // componentDidMount() {
  //   this.setState({memories: this.props.activeUser.memories})
  // }

  clickHandler = () => {
    this.setState({add: !this.state.add})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/memories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: this.state.title,
        date: this.state.date,
        user_id: this.props.activeUser.id
      })
    }).then(res => res.json())
    .then(data => this.props.dispatch({type: 'add_memory', payload: [...this.props.activeUser.memories, data]}))
    this.setState({title: '', date: '', add: !this.state.add})
  }

  render() {
    let memCards
    if (this.props.activeUser) {
      memCards = this.props.activeUser.memories.map(mem => <MemoryCard key={mem.id} memory={mem}/>)
    }
    return (
      <div>
        <div className='header'>
          <h1 className='h1'>Memories</h1>
        </div>
        <div className='memoryCards'>
          {memCards}
        </div>
        {this.state.add ?
        (<div className='memories-form'>
          <form onSubmit={this.submitHandler}>
            <h5>Title: <input type='text' name='title' value={this.state.title} onChange={this.changeHandler}/></h5>
            <h5>Date: <input type='text' name='date' value={this.state.date} placeholder='MM-DD-YY' onChange={this.changeHandler}/></h5>
            <button className='memories-form-button'>Create Memory</button>
          </form>
        </div>) : null}
        {this.props.activeUser ? <button className='memories-button' onClick={this.clickHandler}>Add Memory</button> : null}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}
export default withRouter(connect(mapStateToProps)(Memories));
