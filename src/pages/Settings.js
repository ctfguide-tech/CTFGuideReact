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

const Settings = () => {
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

    const [Learn, setLearn] = useState({
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
                setLearn({
                        data: JSON.parse(this.responseText)
                    }
                );

            }
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/Learn/global`);
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
                        document.getElementById("navPoints").innerHTML = data.points;

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
        { name: 'Learn', href: '#', current: true },
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


            <main className="mt-3" >

                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8   ">

              
    
                    <p className={" text-white  text-4xl font-semibold"}> Settings</p>
          
                 

     <div className="" >


    
 
     <div class="grid grid-cols-2 gap-4">


    <div className="mt-4 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
    <div className=" items-center justify-between">
      <h1 className="text-2xl w-full font-bold"><i class="fas fa-shield-alt"></i> Account Settings</h1>
      <hr className="text-gray-800 bg-gray-800 border-gray-600 mt-2 mb-2"></hr>
            <p className="text-xl font-semibold">Change your account password</p>
            <input placeholder="New Password" className=" mt-3 border border-gray-600 bg-gray-800 px-2 py-1 rounded-lg w-full"/>

            <input placeholder="Confirm New Password" className="mt-3 border border-gray-600 bg-gray-800 px-2 py-1 rounded-lg w-full"/>

            <p className="text-xl font-semibold mt-4">Change your username</p>
            <input placeholder="Loading..." className="mt-3 border border-gray-600 bg-gray-800 px-2 py-1 rounded-lg w-full"/>

            <p className="text-xl font-semibold mt-4">Set a biography</p>
            <textarea placeholder="People can see your biography when clicking on your name" className="mt-3 border border-gray-600 bg-gray-800 px-2 py-1 rounded-lg w-full">
            </textarea>

            <p className="text-xl font-semibold mt-4">Profile Picture</p>

            <div className="flex align-middle">
            <img  className="h-10 w-10 rounded-full align-middle border border-white" src="../../defaultpfp.png" alt="profile picture" />
            <input type="file" className="ml-2 mt-1.5 text-sm align-middle"></input>
            </div>
    
      </div>
     
    </div>


    <div className="mt-4 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
    <div className=" items-center justify-between">
      <h1 className="text-2xl w-full"><i class="fas fa-file-invoice-dollar"></i> Billing Settings</h1>
      <hr className="text-gray-800 bg-gray-800 border-gray-600 mt-2 mb-2"></hr>
      <h1 className="text-center text-4xl  mt-4">Upgrade to <span className="font-bold text-blue-500">CTFGuide Pro</span></h1>

      <div class="grid grid-cols-2 gap-4">
      <div style={{cursor: 'pointer'}}  className="mt-4 bg-gray-800 border  border-gray-700 hover:bg-gray-900  px-4 py-4 text-white rounded ">
      <h1 className="text-center text-3xl">Monthly</h1>

        <h1 className="text-center text-xl">$4.99/month</h1>
</div>

<div style={{cursor: 'pointer'}} className="mt-4 bg-gray-800 border  border-gray-700 hover:bg-gray-900 px-4 py-4 text-white rounded ">
<h1 className="text-center text-3xl">Annually</h1>

<h1 className="text-center text-xl">$35.88/year</h1>

</div>
</div>

<h1 className="text-xl mt-4 text-center mb-1">What do you get?</h1>
                <div className="bg-gray-800 px-2 py-1 text-center">
                    <p>Unlimited machine learning graded responses</p>
                    </div>  
                    <div className="mt-1 bg-gray-800 px-2 py-1 text-center">
                    <p>Show of an exclusive CTFGuide Pro badge</p>
                    </div>    
                    <div className="mt-1 bg-gray-800 px-2 py-1 text-center">
                    <p>Classroom member limits are removed**</p>
                    </div>   
                    <div className="mt-1 bg-gray-800 px-2 py-1 text-center">
                    <p>Access to interview preparation content**</p>
                    </div>   

                    <p className="mt-4 text-sm text-gray-500">* For the features marked with a star, it means it has not been released yet. For every month you have CTFGuide Pro, if the feature has not been implemented yet, you'll be given an additional free month of Pro.</p>
    
      </div>    
     
    </div>


    </div>
    <div className="hidden mt-4 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
    <div className=" items-center justify-between">
      <h1 className="text-2xl w-full"><i class="fas fa-terminal"></i> Developer Settings</h1>
        <ul>
            <li><a className=""> <i class="fas fa-arrow-right"></i> Generate API Key</a></li>


        </ul>
                    
    
      </div>    
     
    </div>
  

    </div>


                </div>

                
            </main>

        
        </div>


    )


}




export default Settings;