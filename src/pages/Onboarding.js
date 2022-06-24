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
                                        <span> Site access will be limited until completion of onboarding process  </span>  
                                        </a>
                                        </div>
                            </div>
                        </div>

                    </>
                )}
            </Disclosure>


        <div className="bg-black min-h-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-7xl">
            <main className="px-6">

             <br></br>  
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-1">
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0">
            <img width="200" className="" src="../onboarding/join.svg" alt="Onboarding" />
          </div>
    
        </div>
        </div>
        <div className="col-span-1">
        <div className="flex flex-col items-center">
       
          <div className="mt-4">
          <p className="text-4xl font-semibold text-white sm:text-5xl">Hi there!</p>
          <p className="text-white text-lg mx-auto text-enter text-2xl">
                          How should we call you? <span className="text-sm text-gray-600">(This will be your username.)</span>
                          </p>

                        <input placeholder="Username" className="mt-5 w-full rounded-lg px-2 py-1 text-xl bg-gray-900 border border-gray-700"></input>
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