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
import { Navigation } from '../components/navigation';

const Leaderboards = () => {
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


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 & this.status === 200) {
       
    
               

            for (let i = 0; i < JSON.parse(this.responseText).length; i++) {

                if (JSON.parse(this.responseText)[i].username === userData.username) {
                    document.getElementById("myrank").innerHTML = "#" +  (i + 1);

                }
            }


        }
    }
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/leaderboards/global`);
    xhttp.send();


    useEffect(() => {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 & this.status === 200) {
           
        
                   setLeaderboards({
                        data: JSON.parse(this.responseText)
                    }

                    
                );

                for (let i = 0; i < JSON.parse(this.responseText).length; i++) {

                    if (JSON.parse(this.responseText)[i].username === userData.username) {
                        document.getElementById("myrank").innerHTML = "#" +  (i + 1);

                    }
                }


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
                    document.getElementById("pfp1").src = firebaseUser.photoURL
                  } else {
                    setUser({
                      name: firebaseUser.displayName,
                      email: firebaseUser.email,
                      imageUrl:
                        `https://ui-avatars.com/api/?name=${firebaseUser.email}&background=random`,
                    });
                    document.getElementById("pfp1").src = `https://ui-avatars.com/api/?name=${firebaseUser.email}&background=random`
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

                        document.getElementById("navPoints").innerHTML = data.points

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

        <Navigation/>


            <main className="mt-6 " >

                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">

                    <div id="loader" className="py-10 mb-10">
                        <h1 className="text-white text-4xl text-center"><i class="fas fa-spinner text-white  fa-spin"></i> Preparing for blast off</h1>
                        <p className="text-white text-center">You're probably going to see this a lot during the beta as our cache system hasn't been setup yet.</p>

                    </div>

                    <h1 className="text-white text-4xl">🌎 Global Leaderboards (top 20)</h1>
                    <table className="table-auto text-white w-full mt-4">

                        <tbody className="mt-4 text-xl  ">
                        <tr className={("text-2xl font-semibold py-3")}>
                            <td>Username</td>
                            <td>Rank</td>
                            <td>Points</td>
                            <td>Country</td>
                        </tr>
                        <tr className="bg-gray-600 border border-gray-600" >
                                <td className="px-6 ">
                                    <span id="myrank" className="">#</span>
                                </td>
                                <td className={"inline-flex px-6"}><img className={"w-6 mr-2 hidden"} src={"https://ui-avatars.com/api/?name="+ (userData.username) + "&background=random"}/><a href="" className={(userData.pro ? "rainbow-text" : "") + " font-semibold"} >{userData.username}</a></td>
                                <td>{userData.points}</td>
                            </tr>
                        {leaderboards.data.map((item) => (
                            <tr >
                                <td className={"inline-flex"}><img className={"w-6 mr-2"} src={"https://ui-avatars.com/api/?name="+ (item.username) + "&background=random"}/><a href="" className={(item.pro ? "rainbow-text" : "") + " font-semibold"} >{item.username}</a></td>
                                <td>Gold</td>
                                <td>{item.points}</td>
                                <td>{item.country} </td>
                            </tr>
                        ))}


                        </tbody>
                    </table>

                  
                    <p className="text-yellow-500 mb-3 hidden"><i className="fas fa-tools"></i> <b>Developer Broadcast</b> The following services aren't avaliable: Learning Paths, Progress, Challenge Solving, Classes, CTFLive, Friends, Settings, Billing, Terminals and more.</p>
                    <p className="text-yellow-500 mb-3 hidden">If you are seeing this message it means the CTFGuide API is offline.</p>
                    <p className="text-yellow-500 mb-3 hidden">This is a site wide broadcast. Hi!</p>

                </div>
            </main>

        </div>


    )


}




export default Leaderboards;