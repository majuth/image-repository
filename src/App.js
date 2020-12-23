import './App.css';
import React, { Component } from 'react';
import { storage } from "./firebase";

class App extends Component {

  constructor(){
    super()
    this.state = {
      image: null,
      images: null
    }
  }

  componentDidMount(){
    this.displayImages();
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
    var tempImages = "";
    storage.ref("images").listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        imageRef.getDownloadURL().then(function(url){
          document.getElementById("imageContent").innerHTML = (document.getElementById("imageContent").innerHTML + "<div class='imageHolder'><img src=" + url + " class='pics'/></div>");
          console.log(url);
          //tempImages.concat("<img src=" + {url} + "/>")
        })
      });
    }).then(document.getElementById("imageContent").innerHTML = tempImages); //can make .then render here
    console.log(tempImages);    
    return tempImages;
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
          <div id="imageContent">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
