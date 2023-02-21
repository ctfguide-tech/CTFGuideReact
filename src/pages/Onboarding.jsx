import React, { Component, Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'animate.css';

const Onboarding = () => {
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

  function step1() {
    var username = document.getElementById("username").value;
    var fullName = document.getElementById("fullName").value;
    var age = document.getElementById("age").value;
    var country = document.getElementById("country").value;
    var jobTitle = document.getElementById("").value;


  }


  return (
    <>


      <div className=" min-h-full   " style={{ fontFamily: 'Poppins, sans-serif' }}   >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <main className="px-6">

            <br></br>

            <div id="step1" className="hidden">

              <div id="step1error" className="hidden mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                <h1><i class="fas fa-times"></i> Something went wrong.</h1>
              </div>

              <div className='flex justify-center items-center h-screen'>
                <div style={{ backgroundColor: "#161716" }} className=" ">

                  <img src="../onboarding.png" width={60} className="mx-auto mt-4 mb-5 rounded-lg"></img>
                  <h1 className='text-white text-2xl mt-2 text-center font-semibold'>Onboarding</h1>
                  <hr style={{ borderColor: "#212121" }} className='mt-4 ml-6 mr-6'></hr>

                  <div style={{ backgroundColor: "#161716" }} className='max-w-6xl mt-4 mx-auto'>

                    <div className="my-auto mx-auto px-4 ">

                      <h1 className='text-white text-xl '> You seem new around here, tell us about yourself. </h1>
                      <div className=' mt-4'>
                        <div className="isolate -space-y-px rounded-md shadow-sm">
                          <div style={{ borderColor: "#212121" }} className="relative rounded-md rounded-b-none border  px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <label htmlFor="name" className="block text-xs font-medium text-white">
                              Username
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="username"
                              style={{ backgroundColor: "#212121" }}
                              className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500  focus:ring-0 sm:text-sm px-4"
                              placeholder="This is what people on CTFGuide will know you as."
                            />
                          </div>
                          <div style={{ borderColor: "#212121" }} className="relative rounded-md rounded-t-none rounded-b-none border  px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <label htmlFor="name" className="block text-xs font-medium text-white">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="fullname"
                              style={{ backgroundColor: "#212121" }}
                              className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500  focus:ring-0 sm:text-sm px-4"
                              placeholder="This is private to the public by default."
                            />
                          </div>
                          <div style={{ borderColor: "#212121" }} className="relative rounded-md rounded-t-none rounded-b-none border  px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <label htmlFor="name" className="block text-xs font-medium text-white">
                              Age
                            </label>
                            <input
                              type="number"
                              name="name"
                              id="age"
                              style={{ backgroundColor: "#212121" }}
                              className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500  focus:ring-0 sm:text-sm px-4"
                              placeholder="You must be 13 or older to use CTFGuide."
                            />
                          </div>

                          <div style={{ borderColor: "#212121" }} className="relative rounded-md rounded-t-none rounded-b-none border  px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <label htmlFor="name" className="block text-xs font-medium text-white">
                              Country
                            </label>
                            <input
                              type="country"
                              name="Country"
                              id="Country"
                              style={{ backgroundColor: "#212121" }}
                              className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500  focus:ring-0 sm:text-sm px-4"
                              placeholder="Compete in our leaderboards on behalf of your country."
                            />
                          </div>

                          <div style={{ borderColor: "#212121" }} className="relative rounded-md rounded-t-none border px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <label htmlFor="job-title" className="block text-xs font-medium text-white">
                              Job Title
                            </label>
                            <select
                              style={{ backgroundColor: "#212121" }}
                              type="text"
                              name="job-title"
                              id="jobtitle"
                              className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500 focus:ring-0 sm:text-sm px-4"
                              placeholder="Head of Tomfoolery"
                            >
                              <option>Student</option>
                              <option>K-12 Teacher</option>
                              <option>College Professor</option>
                              <option>Employer</option>
                              <option>Other</option>

                            </select>

                          </div>
                        </div>

                        <div className='mx-auto text-center mx-auto'>
                          <button className='button mt-8 w-2/3 mx-auto bg-blue-800 hover:bg-blue-900 text-white py-2 rounded'>Next Step</button>
                        </div>
                      </div>




                    </div>
                  </div>









                </div>
              </div>
            </div>

            <div id="step2" className="">

              <div id="step2error" className="hidden mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                <h1><i class="fas fa-times"></i> Something went wrong.</h1>
              </div>

              <div className='flex justify-center items-center h-screen'>
                <div style={{ backgroundColor: "#161716" }} className=" ">

                  <img src="../onboarding.png" width={60} className="mx-auto mt-4 mb-5 rounded-lg"></img>
                  <h1 className='text-white text-2xl mt-2 text-center font-semibold'>Onboarding</h1>
                  <h1 className=' text-xl mx-auto text-center' style={{ color: "#8c8c8c" }}>  We've emailed you a verification code.</h1>
                  
                  <input className=''></input>








                </div>
              </div>
            </div>


            <div id="step3" className="hidden">

              <div id="step1error" className="hidden mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                <h1><i class="fas fa-times"></i> Something went wrong.</h1>
              </div>

              <div className='flex justify-center items-center h-screen'>
                <div style={{ backgroundColor: "#161716" }} className=" ">

                  <img src="../onboarding.png" width={60} className="mx-auto mt-4 mb-5 rounded-lg"></img>
                  <h1 className='text-white text-2xl mt-2 text-center font-semibold'>Onboarding</h1>
                  <h1 className=' text-xl mx-auto text-center' style={{ color: "#8c8c8c" }}>  Stay engaged by joining our community.</h1>
                  <h1 className=' text-sm mx-auto text-center italic mt-1' style={{ color: "#8c8c8c" }}>  Optional, but highly recommended.</h1>



                  <div style={{ backgroundColor: "#161716" }} className='max-w-6xl mt-4 mx-auto'>

                    <div className="my-auto mx-auto px-4 ">

                      <div style={{ borderColor: "#212121" }} className='card border-2 mt-4 px-10 rounded-sm cursor-pointer'>
                        <div className='card-body'>
                          <div className='flex justify-center items-center'>
                            <h1 className='text-white py-6 text-2xl'>Join our <span style={{ color: "#5865F2" }}>Discord</span> community</h1>
                          </div>
                        </div>
                      </div>

                      <div style={{ borderColor: "#212121" }} className='card border-2 mt-4 px-10 rounded-sm cursor-pointer'>
                        <div className='card-body'>
                          <div className='flex justify-center items-center'>
                            <h1 className='text-white py-6 text-2xl'>Follow us on <span style={{ color: "#00acee" }}>Twitter</span></h1>
                          </div>
                        </div>
                      </div>

                      <div className='mx-auto text-center mx-auto'>
                        <button className='button mt-8 w-2/3 mx-auto bg-blue-800 hover:bg-blue-900 text-white py-2 rounded'>Start hacking!</button>
                      </div>



                    </div>
                  </div>









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