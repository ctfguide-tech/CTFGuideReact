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

const ClassView = () => {
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

    const [classData, setClassData] = useState({
    });


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
        
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 & this.status === 200) {
                let data = JSON.parse(this.responseText);

                console.log("DEBUG CLASS INFO")
                console.log(data)
                setClassData(data);


            } 

            if (this.readyState === 4 & this.status != 200) {
                document.getElementById("unauthorized").classList.remove("hidden")
            }
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/classes/${window.location.href.split("/")[4]}/info?uid=${localStorage.getItem("token")}`);
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

                        if (data.createdClasses.includes(window.location.href.split("/")[4])) {
                            window.location.href = `/classes/admin/${window.location.href.split("/")[4]}`
                        }

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

                <div id="unauthorized" className="hidden">
                <p className={" text-white  text-4xl font-semibold"}> Unauthorized</p>
                <p className={" text-white  text-2xl font-semibold"}> You are not authorized to view this page. </p>
                </div>
          
                <div id="" className="hidden">
                <p className={" text-white  text-4xl font-semibold"}> Catastrophic Failure</p>
                <p className={" text-white  text-2xl font-semibold"}> It seems that this class exists but hasn't been fully processed. Please try again later. </p>
                </div>


                    <p className={" hidden text-white  text-4xl font-semibold"}> {classData.name}</p>
          
                 

     <div className="" >


     <p className={"mt-6 text-white  text-2xl font-semibold"}><i class="fas fa-bullhorn"></i> Class Announcements</p>
     <div  className="mt-2  bg-gray-900 border  border-gray-700  px-4 py-2 text-white rounded ">



<div className=" items-center justify-between">


<div className="flex align-middle ">
<img className="rounded-full w-8 h-8 items-center justify-between mr-1 " src="https://avatars.githubusercontent.com/u/23617187?v=4"></img> 
<p><span className="font-semibold">Pranav Ramesh <i class="fas fa-user-shield"></i></span> <br></br>5/17/22 12:00AM</p>
</div>
 <p className="mt-4"> 
        Due to Keystone exams we will be taking a break from the class. If you want to come in during learn to continue working, please email me. Please remember finals are coming soon! If you want to prepare for the final - try out some of the medium problems.
 </p>

  </div>
 
</div>


     <p className={"mt-6 text-white  text-2xl font-semibold"}><i class="fas fa-pencil-ruler"></i> Your Assignments</p>

    
    <div style={{cursor:'pointer'}} className="mt-2 hover:border-blue-500 bg-gray-900 border  border-gray-700  px-4 py-2 text-white rounded ">



    <div className=" items-center justify-between">
      <h1 className="text-xl w-full"> <i class="fas fa-fw fa-file-alt"></i>  Chapter 1 - Lesson 1 <span className="ml-3 bg-red-900 px-4 rounded-full text-red-300 text-sm py-1"><i class="fas fa-exclamation-circle"></i> Overdue</span></h1>
        <p className=""> <i class="fas fa-fw fa-clock"></i> Due 5/12/22</p>
    
      </div>
     
    </div>
  
  
    <div style={{cursor:'pointer'}} className="mt-2 hover:border-blue-500 bg-gray-900 border  border-gray-700  px-4 py-2 text-white rounded ">



    <div className=" items-center justify-between">
      <h1 className="text-xl w-full"> <i class="fas fa-flag"></i>  Black Panther <span className="hidden ml-3 bg-red-900 px-4 rounded-full text-red-300 text-sm py-1"><i class="fas fa-exclamation-circle"></i> Overdue</span> <span className=" ml-3 bg-green-900 px-4 rounded-full text-green-300 text-sm py-1"><i class="fas fa-check-circle"></i> Completed</span></h1>
        <p className=""> <i class="fas fa-fw fa-clock"></i> Due 5/18/22</p>
    
      </div>
     
    </div>

   


  
    </div>


                </div>

                
            </main>

        
        </div>


    )


}




export default ClassView;