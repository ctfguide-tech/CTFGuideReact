import React, {Component, Fragment, useEffect, useState} from 'react';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Link} from "react-router-dom";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth";


const Onboarding = () => {
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
           
           <div id="step1" className="hidden">
             <div className="px-3">
          <p className="text-4xl font-semibold text-white sm:text-5xl">Hi there!</p>
          <p className="text-white text-lg mx-auto text-enter text-2xl">
                          What should we call you? 
                          </p>

                      <span id="ok"><i class="hidden fas fa-check text-green-400 mr-4"></i></span> 
                      <span id="bad"><i class="hidden fas fa-times text-red-400 mr-4"></i></span>
                      <input placeholder="Username" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-2 text-xl bg-gray-900 border border-gray-700"></input> <span style={{cursor:'pointer'}} className="ml-4 px-2  bg-gray-900  border border-gray-700 rounded-lg py-1 text-xl text-white">Continue</span>
                                  
                        <p className="text-white text-lg mx-auto text-enter text-xl mt-4">
                          This is how people will recognize you on CTFGuide. Make sure your username is unique and friendly!
                          </p>
          </div>

          <img width="400" src="../onboarding/cardPreview.png"></img>
          </div>

          <div id="step2" className="">
             <div className="px-3">

                                          <div className="mb-4 border border-red-500 rounded-lg w-1/2 bg-red-900 text-red-100 px-2 py-1">
                                            <h1><i class="fas fa-times"></i> Something went wrong.</h1>
                                          </div>

          <p className="text-4xl font-semibold text-white sm:text-5xl">Glad to meet you, Laphatize.</p>
          <p className="text-white text-lg mx-auto text-enter text-2xl">
                          Please fill in your personal information
                          </p>

         
                      <input placeholder="Age" type="number" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-1 text-xl bg-gray-900 border border-gray-700"></input> 
                      <input placeholder="Full Name" type="string" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-1 text-xl bg-gray-900 border border-gray-700"></input> 
                      <input placeholder="Country" type="country" className="focus-outline-none outline-none mt-5 w-2/3 text-white rounded-lg px-5 py-1 text-xl bg-gray-900 border border-gray-700"></input> 

                        <p className="text-white  mx-auto   mt-4">
                       <input type="checkbox" className="bg-gray-900 rounded-lg border-gray-700 mr-2"></input>You've reviewed CTFGuide's <a href="./privacy-policy" className="text-blue-500">Privacy Policy</a>.
                       <input type="checkbox" className="ml-5 bg-gray-900 rounded-lg border-gray-700 mr-2"></input> You've reviewed CTFGuide's <a href="./terms-of-service" className="text-blue-500">Terms of Service</a>.

                          </p>
                          <br></br>

                          <span style={{cursor:'pointer'}} className="mt-5 px-2  bg-gray-900  border border-gray-700 rounded-lg py-1 text-xl text-white">Continue</span>  
          </div>

          </div>


        </main>
          </div>
        </div>
      </>
    )
    };
    
  export default Onboarding;