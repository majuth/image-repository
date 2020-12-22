import './App.css';
import React, { Component } from 'react';
import { storage } from "./firebase";

class App extends Component {
  state = {
    image: null,
    images: []
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
            console.log(url);
            this.displayImages();
          });
      }
    )
    
  }

  displayImages =  () =>{
    var tempImages = [];
    storage.ref("images").listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        imageRef.getDownloadURL().then(function(url){
          tempImages.push(url)
        })
      });
    });
    this.setState({
      images: tempImages
    })
    console.log(this.state.images);
  }



  renderImage(imageUrl) {
    return (
      <div>
        <img src={imageUrl} class="pics" alt="galleryImage"/>
      </div>
    );
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
          {this.state.images.map(imageUrl => this.renderImage(imageUrl))}
          <div>
          
          </div>
        </div>
      </div>
    );
  }
}

export default App;
