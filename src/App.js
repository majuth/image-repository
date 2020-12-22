import './App.css';
import React, { Component } from 'react';
import { storage } from "./firebase";


class App extends Component {
  state = {
    image: null
  }


  fileSelectHandler = event =>{
    this.setState({
      image: event.target.files[0]
    })
  }

  fileUploadHandler = () =>{
    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url)
          });
      }

    )
  }


  render(){
    return (
      <div>
        <div className="App-header">
          <h2>Image Repository</h2>
        </div>

        <div className="App">
          <br></br>
          <div id="fileInput">
            <input type="file" onChange={this.fileSelectHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
