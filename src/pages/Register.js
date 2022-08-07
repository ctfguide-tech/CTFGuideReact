
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useReducer } from "react/cjs/react.production.min";


const Register = () => {
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
  const analytics = getAnalytics(app);
  document.title = "CTFGuide - Register"

  function googleRegister() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      localStorage.setItem("token", user.uid);
      window.location.href = "/onboarding"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("error").innerHTML = errorMessage
      document.getElementById("error").classList.remove("hidden")
    });
    
  }
  function Register() {
    const auth = getAuth();

    if (document.getElementById('password').value === document.getElementById('cpassword').value) {
    createUserWithEmailAndPassword(auth, document.getElementById("email-address").value, document.getElementById("cpassword").value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem("token", user.uid);
        window.location.href = "/onboarding"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
        document.getElementById("error").innerHTML = errorMessage
        document.getElementById("error").classList.remove("hidden")
      });
    } else {
        document.getElementById("error").innerHTML = "Passwords do not match"
        document.getElementById("error").classList.remove("hidden")
    }
  }

  return (

    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
    <div className="max-w-md w-full space-y-8">
      <div>
     <Link to="../"><img  src="../CTFGuide trans dark.png" className="mx-auto" width="100"/></Link>
        <h2 style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mt-1 text-center text-3xl text-white">Sign up for CTFGuide</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="../login" className="font-medium text-blue-600 hover:text-blue-500">
                login to your account
              </Link>
        </p>
      </div>
      <div className="mt-8 space-y-2">
        <input type="hidden" name="remember" defaultValue="true" />
        <span className="hidden text-red-500 font-semibold text-centered" id="error">Error occured..</span>
       
        <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="text"
              autoComplete="current-email"
              required
              className="appearance-none  relative block w-full px-3 py-2  bg-gray-900 border-gray-800 border placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              autocomplete="off"
            />
          </div>


        <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none  relative block w-full px-3 py-2  bg-gray-900 border-gray-800 border placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              autocomplete="off"
            />
          </div>


          <div>
            <label htmlFor="password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="cpassword"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none  relative block w-full px-3 py-2  bg-gray-900 border-gray-800 border placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              autocomplete="off"
            />
          </div>

       

        <div>
          <button
            onClick={Register}
            className="mt-4 group relative w-full flex justify-center py-2 px-4 bg-gray-900 border-gray-800 border text-sm font-medium rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
     
            Register
          </button>

          <button
            onClick={googleRegister}
            type="submit"
            className="mt-4 group relative w-full flex justify-center py-2 px-4 bg-gray-900 border-gray-800 border text-sm font-medium rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
         
         <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="mr-2"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg> Register with Google
          </button>

          
        </div>
      </div>
    </div>
  </div>

  )
}

  
export default Register;