
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useReducer } from "react/cjs/react.production.min";


const Register = () => {
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
  function register() {
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
  /*
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
    */

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", height: "100vh" }} className="flex min-h-full animate__animated animate__fadeIn">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className=" mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="../" className="my-auto flex">
              <img
                className="h-10 w-10 zimg"
                src="../../CTFGuide trans dark.png"
                alt="CTFGuide"
              />
              <h1 className='text-white text-xl my-auto'>CTFGuide</h1>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Register</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <a href="./login" className="font-medium text-blue-600 hover:text-blue-500">
                login to your account
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div hidden>
                <p className="text-sm font-medium text-white">Sign up with</p>

                <div className="mt-2 grid grid-cols-2 gap-3 hidden">


                  <div>
                    <a
                      style={{ backgroundColor: "#212121" }}
                      href="#"
                      className="inline-flex w-full justify-center rounded-md   py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign up with Google</span>
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <clipPath id="p.0"> <path d="m0 0l20.0 0l0 20.0l-20.0 0l0 -20.0z" clipRule="nonzero" /> </clipPath> <g clipPath="url(#p.0)"> <path fill="currentColor" fillOpacity="0.0" d="m0 0l20.0 0l0 20.0l-20.0 0z" fillRule="evenodd" /> <path fill="currentColor" d="m19.850197 8.270351c0.8574047 4.880001 -1.987587 9.65214 -6.6881847 11.218641c-4.700598 1.5665016 -9.83958 -0.5449295 -12.08104 -4.963685c-2.2414603 -4.4187555 -0.909603 -9.81259 3.1310139 -12.6801605c4.040616 -2.867571 9.571754 -2.3443127 13.002944 1.2301085l-2.8127813 2.7000687l0 0c-2.0935059 -2.1808972 -5.468274 -2.500158 -7.933616 -0.75053835c-2.4653416 1.74962 -3.277961 5.040613 -1.9103565 7.7366734c1.3676047 2.6960592 4.5031037 3.9843292 7.3711267 3.0285425c2.868022 -0.95578575 4.6038647 -3.8674583 4.0807285 -6.844941z" fillRule="evenodd" /> <path fill="currentColor" d="m10.000263 8.268785l9.847767 0l0 3.496233l-9.847767 0z" fillRule="evenodd" /> </g>
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

              <div className="hidden relative mt-6">

                <div className="relative flex justify-center text-sm">
                  <span className=" px-2 text-gray-500">Or use your email</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="space-y-6">
                <div id="error" className="hidden text-white bg-blue-900 animate_animated animate__fadeIn border border-blue-500 px-2 py-2 rounded-lg">
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

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                   Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      style={{ backgroundColor: "#212121", borderStyle: "none" }}
                      id="cpassword"
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
                    onClick={register}
                    id="registerBtn"
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-700 hover:shadow-lg hover:shadow-blue-500/00 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none "
                  >
                    Create an account
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


export default Register;