import React from 'react';
import {connect} from 'react-redux';

class MemoryCard extends React.Component {

  state = {
    id: this.props.memory.id,
    title: this.props.memory.title,
    date: this.props.memory.date,
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
    let mems = this.props.memories.filter(mem => mem.id !== this.props.memory.id)
    fetch(`http://localhost:3000/memories/${this.props.memory.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: this.state.title,
        date: this.state.date
      })
    })
    .then(res => res.json())
    .then(data => this.props.dispatch({type: 'edit_memory', payload: [...mems, data]}))
    this.setState({edit: !this.state.edit})
  }

  deleteHandler = (e) => {
    e.preventDefault()
    let mems = this.props.memories.filter(mem => mem.id !== this.props.memory.id)
    fetch(`http://localhost:3000/memories/${this.props.memory.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }})
    .then(data => this.props.dispatch({type: 'delete_memory', payload: mems}))
  }

  render() {
    console.log(this.props.activeUser)
    console.log(this.props.memory)
    return (
      <div className='memoryCard'>
      {!this.state.edit ?
        (<div onClick={() => this.props.dispatch({type: 'choose_memory', payload: this.props.memory})}>
        <h1 className='memoryCard-info'>{this.props.memory.title}</h1>
        <h1 className='memoryCard-info'>{this.props.memory.date}</h1>
        </div>) :
        (<div>
          <form onSubmit={this.submitHandler}>
            <h1>Title: <input className='memoryCard-form-input' type='text' name='title' value={this.state.title} onChange={this.changeHandler}/></h1>
            <h1>Date: <input className='memoryCard-form-input' type='text' name='date' value={this.state.date} onChange={this.changeHandler}/></h1>
            <button className='memoryCard-button'>Update</button>
          </form>
        </div>)
      }
      {this.props.activeUser && this.props.memory.user.id === this.props.activeUser.id ?
        (<div>
          <button className='memoryCard-button' onClick={this.editHandler}>Edit</button>
          <button className='memoryCard-button' onClick={this.deleteHandler}>Delete</button>
        </div>) : null}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    memories: state.memories,
    activeMemory: state.activeMemory,
    activeUser: state.activeUser
  }
}
export default connect(mapStateToProps)(MemoryCard);
