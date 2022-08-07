import React, {Component, Fragment, useEffect, useState} from 'react';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Link} from "react-router-dom";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'animate.css';

const Onboarding = () => {
  
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
  let uid = "pending"
  const auth = getAuth();
  const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    
    node.classList.add(`${prefix}animated`, animationName);


    
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

  onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        window.location.href = "../login"
      } else {
        //window.alert(JSON.stringify(firebaseUser))
      }
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 || this.status == 200) {
      // OK
      // Check if email verified

      const data = JSON.parse(this.responseText);

      if (data.emailVerified) {
        window.location.href = "../dashboard";
      } else {
        if (data.username) {
         // window.alert(data.username)
           // skip to OTP step
           animateCSS(".step1", "fadeOutLeft").then((message) => {

            // the step is email otp so lets just create the account with the details now
          
            document.querySelector(".step1").style.display = "none";
    
            document.querySelector(".step3").classList.remove("hidden");
        
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/sendOtp?uid=${localStorage.getItem("token")}`, true);
            xhttp.send();
            animateCSS(".step3", "fadeInRight").then((message) => {
              document.querySelector(".step3").style.opacity = "1";



             

              
            });
  
          
   
          });
        }
      }

      
    

    }

    if (this.readyState == 4 || this.status == 500) {
      // This endpoint only returns this code if the user is not found.
      // We do nothing.
    }

  }
  xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/data?uid=${localStorage.getItem("token")}`)
  xhttp.send();
  function check2FA() {
   // window.alert("check started")
    var final = document.getElementById("first").value +
    document.getElementById("second").value +
    document.getElementById("third").value +
    document.getElementById("fourth").value +
    document.getElementById("fifth").value +
    document.getElementById("sixth").value

   // window.alert(final)
    // check 2fa via api
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText == "Valid OTP") {
        window.location.href = "../dashboard"
        } else {
          document.getElementById("step3error").classList.remove('hidden');
          document.getElementById("step3error").innerHTML = "Invalid OTP Code."
   
        }
      } 

      
    }
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/checkOTP?uid=${localStorage.getItem("token")}&otp=${final}`)
    xhttp.send();
  }

  document.addEventListener("DOMContentLoaded", function(event) {



    function OTPInput() {
    const inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function(event) { if (event.key==="Backspace" ) { inputs[i].value='' ; if (i !==0) inputs[i - 1].focus(); } else { if (i===inputs.length - 1 && inputs[i].value !=='' ) { return true; } else if (event.keyCode> 47 && event.keyCode < 58) { inputs[i].value=event.key; if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode> 64 && event.keyCode < 91) { inputs[i].value=String.fromCharCode(event.keyCode); if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); } } OTPInput(); });
  
  
      var accountTemplate = {
        username: "", 
        age: 0,
        fullName: "",
        country: ""
      }
  
        


  
    function loadStep2() {
    
  //  window.alert("test")
  var username = (document.getElementById("username").value).toLowerCase();
  document.getElementById("usernameDisplay").innerText = username;
  var badChar = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;

// client side checks to reduce server load
  if (!username || username.length < 5 || username.length > 15 ||  badChar.test(username)) {
    document.getElementById("step1error").classList.remove("hidden")
    document.getElementById("step1error").innerText = "Your username must be unique, between 5-15 characters long, and contain only letters, numbers, and underscores"

  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange =  function() {
      if (this.readyState == 4 && this.status == 200) {
        animateCSS(".step1", "fadeOutLeft").then((message) => {


          accountTemplate.username = username;
          document.querySelector(".step1").style.display = "none";
          document.querySelector(".step2").classList.remove("hidden");
    
    
          animateCSS(".step2", "fadeInRight").then((message) => {
            document.querySelector(".step2").style.opacity = "1";
          }
    
          );
    
        });
        
      }

      if (this.readyState == 4 && this.status != 200) {
        document.getElementById("step1error").classList.remove("hidden")
        document.getElementById("step1error").innerText = "Your username must be unique, between 5-15 characters long, and contain only letters, numbers, and underscores"
    
      }
    }
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/checkusername?username=` + username, true);
    xhttp.send();
  }


}

  function loadStep3() {
    let age = document.getElementById("age").value;
    let fullName = document.getElementById("fullName").value;
    let country = document.getElementById("country").value;
    let tosChecked = document.getElementById("tos").checked;
    let ppChecked = document.getElementById("pp").checked;


    accountTemplate.age = age;
    accountTemplate.fullName = fullName;
    accountTemplate.country = country;

    if (!age || !fullName || !country || !tosChecked || !ppChecked) {
      document.getElementById("step2error").classList.remove("hidden")
      document.getElementById("step2error").innerText = "All fields are required."
        
    } else {

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          animateCSS(".step2", "fadeOutLeft").then((message) => {

            // the step is email otp so lets just create the account with the details now
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange =  function() {
              if (this.readyState == 4 && this.status == 200) {
                
            document.querySelector(".step2").style.display = "none";
    
            document.querySelector(".step3").classList.remove("hidden");
        
        
            animateCSS(".step3", "fadeInRight").then((message) => {
              document.querySelector(".step3").style.opacity = "1";
              
            });
    
          }
        };
    
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/sendOtp?uid=${localStorage.getItem("token")}`, true);
        xhttp.send();
    
      
    
          });
        } else {
          document.getElementById("step2error").classList.remove("hidden")
          document.getElementById("step2error").innerText = "Invalid parameters were given."    
        }

      }

      xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/register?uid=${localStorage.getItem("token")}&username=${accountTemplate.username}&age=${accountTemplate.age}&country=${accountTemplate.country}`, true);
      xhttp.send()

      
    }


  }
    return (
      <>
     

<Disclosure as="nav" className="z-20 bg-black border-b  border-gray-700 ">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-14 w-14"
                                            src="../../CTFGuide trans dark.png"
                                            alt="CTFGuide"
                                        />

                                    </div>
                                   
                                </div>
                          
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                <div className=" px-2 space-y-1 z-20">
                                        <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-200  '>
                                        <span style={{fontFamily: 'Space Grotesk, sans-serif'}} className="text-xl"> Onboarding Process  </span>  
                                        </a>
                                        </div>
                            </div>
                        </div>

                    </>
                )}
            </Disclosure>


        <div className="bg-black min-h-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8 " style={{fontFamily: 'Space Grotesk, sans-serif'}}   >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <main className="px-6">

             <br></br>  
           
           <div id="step1" className="step1">

           <div id="step1error" className="hidden mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                                            <h1><i class="fas fa-times"></i> Something went wrong.</h1>
                                          </div>
             <div className="px-3">
          <p className="text-4xl font-semibold text-white sm:text-5xl">Hi there!</p>
          <p className="text-white text-lg mx-auto text-enter text-2xl">
                          What should we call you? 
                          </p>

                      <span id="ok"><i class="hidden fas fa-check text-green-400 mr-4"></i></span> 
                      <span id="bad"><i class="hidden fas fa-times text-red-400 mr-4"></i></span>
                      <input id="username" placeholder="Username" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-2 text-xl bg-gray-900 border border-gray-700"></input> <span style={{cursor:'pointer'}} onClick={loadStep2} className="ml-4 px-2  bg-gray-900  border border-gray-700 rounded-lg py-1 text-xl text-white">Continue</span>
                                  
                        <p className="text-white text-lg mx-auto text-enter text-xl mt-4">
                          This is how people will recognize you on CTFGuide. Make sure your username is unique and friendly!
                          </p>
          </div>

          <img width="400" src="../onboarding/cardPreview.png"></img>
          </div>

          <div id="step2" className="step2 hidden   " style={{opacity:'0'}}>
             <div className="px-3">

                                          <div id="step2error" className="hidden mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                                            <h1><i class="fas fa-times"></i> Something went wrong.</h1>
                                          </div>

          <p className="text-4xl font-semibold text-white sm:text-5xl">Glad to meet you, <span id="usernameDisplay"></span>.</p>
          <p className="text-white text-lg mx-auto text-enter text-2xl">
                          Please fill in your personal information
                          </p>

         
                      <input id="age" placeholder="Age" type="number" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-1 text-xl bg-gray-900 border border-gray-700"></input> 
                      <input id="fullName" placeholder="Full Name" type="string" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-1 text-xl bg-gray-900 border border-gray-700"></input> 
                      <input id="country" placeholder="Country" type="country" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-1 text-xl bg-gray-900 border border-gray-700"></input> 

                        <p className="text-white  mx-auto   mt-4">
                       <input id="pp" type="checkbox" className="bg-gray-900 rounded-lg border-gray-700 mr-2"></input>You've reviewed CTFGuide's <a href="./privacy-policy" className="text-blue-500">Privacy Policy</a>.
                       <input id="tos" type="checkbox" className="ml-5 bg-gray-900 rounded-lg border-gray-700 mr-2"></input> You've reviewed CTFGuide's <a href="./terms-of-service" className="text-blue-500">Terms of Service</a>.

                          </p>
                          <br></br>
                          
                          <span  onClick={loadStep3} style={{cursor:'pointer'}} className="mt-5 px-2  bg-gray-900  border border-gray-700 rounded-lg py-1 text-xl text-white">Continue</span>  
          </div>

          </div>


          <div id="step3" className="step3 hidden   " style={{opacity:'0'}}>
             <div className="px-3">

                                          <div id="step3error" className="hidden mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                                            <h1><i class="fas fa-times"></i> Something went wrong.</h1>
                                          </div>

          <p className="text-4xl font-semibold text-white sm:text-5xl">Email Verification</p>
          <p className="text-white text-lg mx-auto text-enter text-2xl">
          Please check your email for a verification code

          </p>
          <div id="otp" class="text-white flex flex-row  text-center mt-5">
            <input class="bg-gray-900 border-gray-700 mr-4 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" /> 
            <input class="bg-gray-900 border-gray-700 mr-4 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" /> 
            <input class="bg-gray-900 border-gray-700 mr-4 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" /> 
            <input class="bg-gray-900 border-gray-700 mr-4 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
            <input class="bg-gray-900 border-gray-700 mr-4 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" /> 
            <input class=" bg-gray-900 border-gray-700 mr-4 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                      <span onClick={check2FA}><i style={{cursor:'pointer'}} class="fas fa-arrow-alt-circle-right h-10 w-10 text-4xl text-gray-100 hover:text-gray-300"></i></span>
                      
                    
                      </div>
                      <p className="text-gray-100 mt-5">Expect an email from verification@mail.ctfguide.com. <br></br>If you don't see the email, try checking your spam folder.</p>
                 
          <p style={{cursor:"pointer"}} className="text-gray-400 hover:text-white">Resend verification code</p>
                     
                          <div   className="hidden text-yellow-400 w-3/4 h-24 mt-4  py-4" disabled>
                          <b> [WEBSITE]</b> <span className='text-white'>Creating account for website...</span>   <br></br>
                          <b className='text-blue-400'> [TERMINAL]</b> <span className='text-white'>Requesting account to be made for undefined...</span>   <br></br>
                          <b className='text-blue-400'> [TERMINAL]</b> <span className='text-red-500'><b>Something failed.</b></span>  <span className="text-white">You will not be able to access your terminal until 24 hours. A developer needs to create your terminal account manually. <br></br></span>    <br></br><br></br>
                                      <p></p>

                                      <br></br> 
                          </div>
</div>

          </div>

        </main>
          </div>
        </div>
      </>
    )
    };
    
  export default Onboarding; 