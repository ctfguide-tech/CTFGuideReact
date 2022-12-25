
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useReducer } from "react/cjs/react.production.min";


const Login = () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  document.title = "CTFGuide - Login"

  function googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      localStorage.setItem("token", user.uid)
      window.location = "./dashboard"
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("loginError").classList.remove("hidden")
        document.getElementById("loginError").innerHTML = errorMessage
        //   window.alert(errorMessage);
      });

  }

  function resetPassword() {

    const auth = getAuth();
    const email = document.getElementById("email-address").value;
    // window.alert(email)
    sendPasswordResetEmail(auth, email).then(() => {
      document.getElementById("passwordReset").classList.remove("hidden")
    }
    ).catch((error) => {
      document.getElementById("passwordReset").classList.remove("hidden")
      document.getElementById("passwordReset").innerHTML = error
    }
    );
  }


  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, document.getElementById("email-address").value, document.getElementById("password").value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem("token", user.uid)

        window.location.href = "./dashboard"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("loginError").classList.remove("hidden")
      });
  }

  /*
  return (

    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
    <div className="max-w-md w-full space-y-8">
      <div>
     <Link to="../"><img  src="../CTFGuide trans dark.png" className="mx-auto" width="100"/></Link>
        <h2 style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mt-1 text-center text-3xl text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to={"../register"} className="font-medium text-blue-600 hover:text-blue-500">
            create an account
          </Link>
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <div id="loginError" className="hidden bg-red-900 border border-red-500 px-2 py-2 rounded-lg">
          <p className="text-white text-center">There was an error when trying to log you in.</p>
        </div>

        <div id="passwordReset" className="text-white hidden bg-blue-900 border border-blue-500 px-2 py-2 rounded-lg">
          <p className="text-white text-center">Check your email for a password reset link.</p>
        </div>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-900 border-gray-800 placeholder-gray-500 text-white rounded-t-md focus:outline-none  sm:text-sm z-10"
              placeholder="Email address"
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
              className="appearance-none rounded-none relative block w-full px-3 py-2  bg-gray-900 border-gray-800 border placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-gray-900 border-gray-800 border rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <p onClick={resetPassword}  className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={login}
            className="group relative w-full flex justify-center py-2 px-4 bg-gray-900 border-gray-800 border text-sm font-medium rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
     
            Sign in
          </button>

          <button
            onClick={googleLogin}
            type="submit"
            className="mt-4 group relative w-full flex justify-center py-2 px-4 bg-gray-900 border-gray-800 border text-sm font-medium rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
         
         <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="mr-2"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg> Login with Google
          </button>

          
        </div>
      </div>
    </div>
  </div>

  )
  */

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", height: "100vh" }} className="flex min-h-full animate__animated animate__fadeIn">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className=" mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="my-auto flex">
              <img
                className="h-10 w-10 zimg"
                src="../../CTFGuide trans dark.png"
                alt="CTFGuide"
              />
              <h1 className='text-white text-xl my-auto'>CTFGuide</h1>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <a href="./register" className="font-medium text-blue-600 hover:text-blue-500">
                create an account
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <p className="text-sm font-medium text-white">Sign in with</p>

                <div className="mt-2 grid grid-cols-2 gap-3">


                  <div>
                    <a
                      style={{ backgroundColor: "#212121" }}
                      href="#"
                      className="inline-flex w-full justify-center rounded-md   py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a
                      style={{ backgroundColor: "#212121" }}
                      href="#"
                      className="inline-flex w-full justify-center rounded-md   py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative mt-6">

                <div className="relative flex justify-center text-sm">
                  <span className=" px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="space-y-6">
                <div id="loginError" className="hidden bg-blue-900 animate_animated animate__fadeIn border border-blue-500 px-2 py-2 rounded-lg">
                  <p className="text-white text-sm text-center">There was an error when trying to log you in.</p>
                </div>


                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      style={{ backgroundColor: "#212121", borderStyle: "none" }}
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md text-white  px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      style={{ backgroundColor: "#212121", borderStyle: "none" }}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none text-white rounded-md  px-3 py-2  shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      style={{ backgroundColor: "#212121", borderStyle: "none" }}
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    onClick={login}
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative  w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1633259584604-afdc243122ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
        />

   
        </div>


    </div>
  )
}


export default Login;