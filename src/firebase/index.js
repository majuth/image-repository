import firebase from  "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDlLFCA96Uq78vFx4XcSYLpaG14vL82KL0",
    authDomain: "image-repository-a7a71.firebaseapp.com",
    projectId: "image-repository-a7a71",
    storageBucket: "image-repository-a7a71.appspot.com",
    messagingSenderId: "129500402969",
    appId: "1:129500402969:web:1b8d8ee90db8c9a6eca188"
  };

  var app = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};