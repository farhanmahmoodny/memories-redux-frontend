import React from 'react';
import {connect} from 'react-redux';
import PhotoCard from './photocard';

class Memory extends React.Component {
  //
  state = {
    memory: null,
    location: '',
    image: '',
    description: '',
    add: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/memories/${parseInt(this.props.match.params.id)}`)
    .then(res => res.json())
    .then(mem => this.setState({memory: mem}))
  }

  openWidget = (e) => {
    e.preventDefault()
    window.cloudinary.createUploadWidget(
     {
       cloudName: process.env.REACT_APP_CLOUD_NAME_KEY,
       uploadPreset: process.env.REACT_APP_UPLOAD_PRESET_KEY
     },
     (error, result) => {

       if (result && result.event === "success") {
         this.setState({
           image: `https://res.cloudinary.com/ddmxdfzlm/image/upload/${result.info.path}`, uploaded: true
         });
       }
     }
   ).open()
  }

  clickHandler = () => {
    this.setState({add: !this.state.add})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        location: this.state.location,
        description: this.state.description,
        image: this.state.image,
        memory_id: this.state.memory.id
      })
    }).then(res => res.json())
    .then(data => this.props.dispatch({type: 'add_photo', payload: [...this.state.memory.photos, data]}))
    this.setState({location: '', description: '', image: '', add: !this.state.add})
  }

  // <div className='photoCards'>
  //   {'photoCards'}
  // </div>
  // {this.state.add ?
  //   (<div>
  //     <form className='memory-form' onSubmit={this.submitHandler}>
  //       <h5>Location: <input type='text' name='location' value={this.state.location} onChange={this.changeHandler}/></h5>
  //       <h5>Description: <input type='textarea' name='description' value={this.state.description} onChange={this.changeHandler}/></h5>
  //       <button className='memory-form-add-button' onClick={this.openWidget}>Add Image</button>
  //       <button className='memory-form-button'>Add</button>
  //     </form>
  //   </div>) : null
  // }
  // { this.props.activeUser ? <button className='memory-button' onClick={this.clickHandler}>Add Photo</button> : null}
  render () {
    let photoCards = this.state.memory ? this.state.memory.photos.map(photo => <PhotoCard key={photo.id} photo={photo}/>) : "Loading"
    return (
      <div>
        <div className='header'>
          <h1 className='h1'>{this.state.memory ? this.state.memory.title : 'Loading'}</h1>
        </div>
        {photoCards}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  }
}
export default connect(mapStateToProps)(Memory);
