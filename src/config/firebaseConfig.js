/*
    © CTFGuide Corporation
*/


import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

/*
        This code is intended to be public. This is public facing client information.
        It isn't some secret key or anything. It's just a way for our auth service (Firebase) to identify the app.
*/

const firebaseConfig = {
  apiKey: "AIzaSyBLAN84VP3jSA5dqhrU6Bjmfu5NiUDuNw4",
  authDomain: "cyberjags-8b081.firebaseapp.com",
  databaseURL: "https://cyberjags-8b081.firebaseio.com",
  projectId: "cyberjags-8b081",
  storageBucket: "cyberjags-8b081.appspot.com",
  messagingSenderId: "166652277588",
  appId: "1:166652277588:web:e08b9e19916451e14dcec1",
  measurementId: "G-7ZNKM9VFN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
