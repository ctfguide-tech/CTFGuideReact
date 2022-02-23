import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { io } from "socket.io-client";
import DashboardManager from "../modules/DashboardManager.js"
import 'animate.css';

const Leaderboards = () => {
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

    const [leaderboards, setLeaderboards] = useState({
        data: []
    })

    const auth = getAuth();
    //const socket = io("http://localhost:3002");


    const [open, setOpen] = useState(true)
    const [show, setShow] = useState(true)
    const cancelButtonRef = useRef(null)
    document.title = "CTFGuide - Dashboard"
    const [user, setUser] = useState({
        name: 'Loading...',
        email: 'Loading...',
        imageUrl: 'https://ctfguide.com/demopfp.png'
    });

    const [userData, setUserData] = useState({
        streak: 0,
        continueWorking: [],
        username: "??",
        points: 0
    })


    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    useEffect(() => {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 & this.status === 200) {
                console.log(this.responseText)
                setLeaderboards({
                        data: JSON.parse(this.responseText)
                    }
                );

            }
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/leaderboards/global`);
        xhttp.send();


        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const uid = firebaseUser.uid;
                console.log(firebaseUser.photoURL);

                if (firebaseUser.photoURL) {
                    setUser({
                        name: firebaseUser.displayName,
                        email: firebaseUser.email,
                        imageUrl: firebaseUser.photoURL,
                    });
                } else {
                    setUser({
                        name: firebaseUser.displayName,
                        email: firebaseUser.email,
                        imageUrl:
                            `https://ui-avatars.com/api/?name=${firebaseUser.email}&background=random`,
                    });
                }

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 & this.status === 200) {
                        let data = JSON.parse(this.responseText);

                        setUserData({
                            username: data.username,
                            streak: data.streak,
                            continueWorking: data.continueWorking,
                            points: data.points
                        })


                        document.getElementById("loader").classList.add("hidden");


                    }

                    if (this.readyState === 4 & this.status === 500) {
                        // User not registered via API
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState === 4 & this.status === 200) {
                                window.location.reload();
                            }
                        }
                        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/register?uid=${firebaseUser.uid}`);
                        xhttp.send();

                    }
                }

                xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/data?uid=${firebaseUser.uid}`);
                xhttp.send();
                /*

                      socket.emit('online', {
                        uid: firebaseUser.uid,
                      });

                      setInterval(() => {
                        socket.emit('heartbeat', {
                        uid: firebaseUser.uid,
                      })}
                      , 5000);
                      */

            } else {
                window.location.href = "../login";
            }
        });


    }, []);



    const people = [
        {
            name: 'Lindsay Walton',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
        },
        // More people...
    ]
    const activityItems = [
        { id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
        // More items...
    ]
    const navigation = [
        { name: 'Dashboard', href: '../dashboard', current: false },
        { name: 'Practice', href: '../practice', current: false },
        { name: 'Learn', href: './learn', current: false },
        { name: 'Classes', href: '#', current: false },
        { name: 'CTFLive', href: '#', current: false },
        { name: 'Leaderboards', href: '#', current: true },
        { name: 'Friends', href: '#', current: false },
    ]
    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', onClick: logout },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function dashboardTutorial() {
        document.getElementById("dashboard_tutorial").classList.remove("hidden")
    }
    function dashboardTutorialDone() {
        window.location.href = "../practice"
    }

    window.onload = function() {
        if (localStorage.getItem("tutorial_phase") == 1) {
            document.getElementById("dashboard_tutorial").classList.remove("hidden")
        }

        if (localStorage.getItem("tutorial_active")) {
            document.getElementById("tutorial_banner").classList.add("hidden")
        }
    }

    return (

        <div className="min-h-full " style={{ fontFamily: 'Space Grotesk, sans-serif' }}>

            <Disclosure as="nav" className="z-20 bg-gradient-to-br from-gray-900 to-black border border-gray-800 ">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-14 w-14"
                                            src="../CTFGuide trans dark.png"
                                            alt="CTFGuide"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        <p className="text-yellow-500 hover:text-yellow-400" style={{cursor:'pointer'}}>✨ Upgrade to pro</p>
                                        <button
                                            type="button"
                                            className="ml-3 bg-gray-900 border border-gray-700 px-3 font-semibold rounded-full text-blue-500  focus:outline-none "
                                        >
                                            <span className="sr-only">View notifications</span>
                                            {userData.points} points
                                        </button>



                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative shrink-0">
                                            <div>
                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-900 border border-gray-700 text-white focus:outline-none z-50">
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
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                    </div>


                                </div>
                                <div className="mt-3 px-2 mx-auto text-center">
                                    <p className="text-yellow-500 hover:text-yellow-400 mb-2" style={{cursor:'pointer'}}>✨ Upgrade to pro</p>
                                    <button
                                        type="button"
                                        className="ml-3  bg-gray-900 border border-gray-700 px-3 font-semibold rounded-full text-blue-500  focus:outline-none "
                                    >

                                        {userData.points} points
                                    </button>
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


            <main className="mt-6 " >

                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">

                    <div id="loader" className="py-10 mb-10">
                        <h1 className="text-white text-4xl text-center"><i class="fas fa-spinner text-white  fa-spin"></i> Preparing for blast off</h1>
                        <p className="text-white text-center">You're probably going to see this a lot during the beta as our cache system hasn't been setup yet.</p>

                    </div>

                    <h1 className="text-white text-4xl">🌎 Global Leaderboards</h1>
                    <table className="table-auto text-white w-full mt-4">

                        <tbody className="mt-4 text-xl  ">
                        <tr className={("text-2xl font-semibold py-3")}>
                            <td>Username</td>
                            <td>Rank</td>
                            <td>Points</td>
                            <td>Country</td>
                        </tr>

                        {leaderboards.data.map((item) => (
                            <tr className={"hover:bg-gray-900 rounded-lg"}>
                                <td className={"inline-flex"}><img className={"w-6 mr-2"} src={"https://ui-avatars.com/api/?name="+ (item.username) + "&background=random"}/><a href="https://test.com" className={(item.pro ? "rainbow-text" : "") + " font-semibold"} >{item.username}</a></td>
                                <td>Gold</td>
                                <td>{item.points}</td>
                                <td>{item.country} </td>
                            </tr>
                        ))}


                        </tbody>
                    </table>

                    <p className={"text-white mt-4"}>On 2/21/22 - major point recalculations were done. If you weren't in the top three for any of the challenges on our website the amount of points you had got reset to 0. Such resets will never occur again - we purely did this because we didn't have enough existing data for us to port into the leaderboards.</p>

                    <p className="text-yellow-500 mb-3 hidden"><i className="fas fa-tools"></i> <b>Developer Broadcast</b> The following services aren't avaliable: Learning Paths, Progress, Challenge Solving, Classes, CTFLive, Friends, Settings, Billing, Terminals and more.</p>
                    <p className="text-yellow-500 mb-3 hidden">If you are seeing this message it means the CTFGuide API is offline.</p>
                    <p className="text-yellow-500 mb-3 hidden">This is a site wide broadcast. Hi!</p>

                </div>
            </main>

        </div>


    )


}




export default Leaderboards;