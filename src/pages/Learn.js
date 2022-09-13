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

const Learn = () => {
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

//c1done


if (data.lessonsCompleted) {
    if (data.lessonsCompleted.includes("c1l1") && data.lessonsCompleted.includes("c1a1") && data.lessonsCompleted.includes("c1l2")) {
        document.getElementById("c1done").classList.remove("hidden");

    }
}
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

              
                <div className="hidden bg-red-900 border border-red-600 px-4 py-2 rounded-lg">
                        <p className={" text-white  text-center"}>
                        <i class="fas fa-exclamation-triangle"></i>  You're exploring a very experiemental feature. There are so many bugs that we lost count. 
                        </p>
                    </div>
                    <p className={" text-white mt-4 text-4xl font-semibold"}>Learn</p>
      
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div
            onClick={() => {window.location.href = './learn/chapter1/lesson1'}}
          className="relative rounded-lg border border-gray-700 bg-gray-900  px-6 py-5 shadow-sm flex space-x-3 hover:border-gray-600 "
        >
         <div className="flex-shrink-0">
          
          </div>
          <div className="flex-1 min-w-0">
              
            <a href="./learn/chapter1/lesson1" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-xl font-medium text-gray-100">Cybersecurity Basics <span id="c1done" className="hidden text-sm bg-green-800 rounded-lg px-2">Completed</span></p>
              <hr className="border-gray-700 mt-2 mb-2"></hr>
            <ul className="text-white">
                <li>C1L1 - What is Cybersecurity?   </li>
                <li>C1A1 - Review Activity   </li>
                <li>C1L2 - Staying Safe Online   </li>
            </ul>
            </a>
          </div>
        </div>

        <div
  
  className="relative rounded-lg border border-gray-700 bg-gray-900  px-6 py-5 shadow-sm flex  space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
>
 <div className="flex-shrink-0">
  
  </div>
  <div   onClick={() => {window.location.href = './learn/chapter2/lesson1'}}
 className="flex-1 min-w-0">
      
    <a href="#" className="focus:outline-none">

      <p className="text-xl font-medium text-gray-100">Linux Basics</p>
      <hr className="border-gray-700 mt-2 mb-2"></hr>
      <ul className="text-white">
                <li>C2L1 - Introduction to Linux   </li>
                <li>C2A1 - Review Activity   </li>
                <li>C2L2 - Interacting with Linux   </li>
                <li>C2A2 - Linux on CTFGuide   </li>

            </ul>
    </a>
  </div>
</div>


<div
  
  className="relative rounded-lg border border-gray-700 bg-gray-900  px-6 py-5 shadow-sm flex  space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
>
 <div className="flex-shrink-0">
  
  </div>
  <div className="flex-1 min-w-0">
      
    <a href="#" className="focus:outline-none">

      <p className="text-xl font-medium text-gray-100">Introduction to CTF</p>
      <hr className="border-gray-700 mt-2 mb-2"></hr>
    <ul className="text-white">
        <li>This lesson isn't avaliable yet.  </li>

    </ul>
    </a>
  </div>
</div>



<div
  
  className="relative rounded-lg border border-gray-700 bg-gray-900  px-6 py-5 shadow-sm flex  space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
>
 <div className="flex-shrink-0">
  
  </div>
  <div className="flex-1 min-w-0">
      
    <a href="#" className="focus:outline-none">

      <p className="text-xl font-medium text-gray-100">Forensics</p>
      <hr className="border-gray-700 mt-2 mb-2"></hr>
    <ul className="text-white">
        <li>This lesson isn't avaliable yet.  </li>

    </ul>
    </a>
  </div>
</div>

<div
  
  className="relative rounded-lg border border-gray-700 bg-gray-900  px-6 py-5 shadow-sm flex  space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
>
 <div className="flex-shrink-0">
  
  </div>
  <div className="flex-1 min-w-0">
      
    <a href="#" className="focus:outline-none">

      <p className="text-xl font-medium text-gray-100">Cryptography</p>
      <hr className="border-gray-700 mt-2 mb-2"></hr>
    <ul className="text-white">
        <li>This lesson isn't avaliable yet.  </li>

    </ul>
    </a>
  </div>
</div>





<div
  
  className="relative rounded-lg border border-gray-700 bg-gray-900  px-6 py-5 shadow-sm flex  space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
>
 <div className="flex-shrink-0">
  
  </div>
  <div className="flex-1 min-w-0">
      
    <a href="#" className="focus:outline-none">

      <p className="text-xl font-medium text-gray-100">Reverse Engineering</p>
      <hr className="border-gray-700 mt-2 mb-2"></hr>
    <ul className="text-white">
        <li>This lesson isn't avaliable yet.  </li>

    </ul>
    </a>
  </div>
</div>


    </div>



  
  
  
  
            </div>



                
            </main>

        
        </div>


    )


}




export default Learn;