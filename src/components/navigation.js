import React, {Component, Fragment, useEffect, useState} from 'react';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Link} from "react-router-dom";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth";

export class Navigation extends Component {

    render() {
        const navigation = [
            { name: 'Dashboard', href: '../dashboard', current: false },
            { name: 'Learn', href: '../learn', current: false },
            //{ name: 'Classes', href: '../classes', current: false },

            { name: 'Practice', href: '../practice/all', current: false },
            { name: 'Leaderboards', href: '../leaderboards/global', current: false },
            { name: 'Create', href: '../create', current: false },
        ]

        const navigation2 = [
            { name: 'Dashboard', href: '../dashboard', current: false },
            { name: 'Learn', href: '../learn', current: false },
            { name: 'Practice', href: '../practice/all', current: false },
            { name: 'Leaderboards', href: '../leaderboards/global', current: false },
            { name: 'Create', href: '../create', current: false },
        ]

        const userNavigation = [

            { name: 'Sign out', onClick: logout },  
         //   { name: 'Settings', href: '../../settings' },

        ]

        const userNavigation2 = [
        //    { name: 'Settings', href: '../../settings' },
            { name: 'Sign out', onClick: logout },
        ]

        const auth = getAuth();


        function logout() {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });

        }

        function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
        }

        return(
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
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-black text-white'
                                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        <p className="hidden text-yellow-500 hover:text-yellow-400" style={{cursor:'pointer'}}>✨ Upgrade to pro</p>
                                        <button
                                            type="button"
                                            className="ml-3 bg-black border border-gray-700 px-3 font-semibold rounded-full text-blue-500  focus:outline-none "
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <span id={"navPoints"}><i className="fas fa-spinner fa-pulse"></i></span>  points
                                        </button>



                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative shrink-0">
                                            <div>
                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img id="pfp1" className="h-8 w-8 rounded-full" src="../../defaultpfp.png" alt="profile picture" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black border border-gray-700 text-white focus:outline-none z-50">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    style={{cursor:'pointer'}}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-800' : '',
                                                                        'block px-4 py-2 text-sm text-gray-200'
                                                                    )}
                                                                    onClick={item.onClick}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}

                                                    
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
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
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden z-20">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-black text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        onClick={item.onClick}

                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                            
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white"></div>
                                        <div className="text-sm font-medium text-gray-400"></div>
                                    </div>


                                </div>
                     <div className=" px-2 space-y-1 z-20">
                                        <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-200  '>
                                        <span id={"navPoints2"}> 0 </span>  points
                                        </a>
                                        </div>
                                <div className="mt-3 px-2 space-y-1 z-20">
                                    {userNavigation.map((item) => (
                                        <a
                                            key={item.name + "m"}
                                            onClick={logout}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700"
                                        >{item.name}</a>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

        )
    }

}