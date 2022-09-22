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

const Classes = () => {
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


    const [classes, setClasses] = useState({
        data: []
      })
    
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


    function joinClass() {
        let classCode = document.getElementById("classCode").value;
        if (classCode.length < 3) {
            document.getElementById("error").classList.add("hidden")
        } else {
            // Send a http request to my server
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText)
                    window.reload();
                    //window.location.href = "./" + classCode;
                } 

                if (this.readyState === 4 && this.status != 200) {
                    document.getElementById("error").classList.remove("hidden")
                }
            };
            xhttp.open("GET", `${process.env.REACT_APP_API_URL}/classes/join-class?uid=${localStorage.getItem('token')}&inviteCode=` + classCode, true);
            xhttp.send();

        }
    }

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




                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                      if (this.readyState === 4 && this.status === 200) {
                        // Success!
                        console.log(JSON.parse(this.responseText));
                        classes.data = []

                        setClasses({
                          data: JSON.parse(this.responseText)
                        })
                        document.getElementById("suggestedLoader").classList.add("hidden");
                      } 

                      if (this.readyState === 4 && this.status === 400) {

                        document.getElementById("noClasses").classList.remove("hidden");

                      }
                   }
                    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/classes/student/my-classes?uid=${localStorage.getItem("token")}`);
                    xhttp.send();



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

                <div className="hidden text-white border border-blue-900 rounded-lg  border-4 px-6 py-3 mb-5"> 
                    <p>CTFGuide Developer Menu <button className="bg-gray-800 px-2 rounded-lg">Hide Menu</button></p>
                    <h1 className="text-xl font-bold">Code Execution</h1>
                    <textarea className="bg-gray-900 border border-none w-full"></textarea>
                    <h1 className="text-xl font-bold">Logged in as {localStorage.getItem("token")}</h1>
                  
                </div>


   <div className="flex items-center justify-between">
                  
                    <p className={" text-white  text-4xl font-semibold"}> Enrolled Classes</p>
                    <div className="ml-2 flex-shrink-0 flex">
               
                    <input id="classCode" className="text-white border border-gray-700 bg-gray-900  px-4 text-xl py-1 rounded-lg focus:outline-none" placeholder="Class Code"></input>
                    <button onClick={joinClass} className="ml-4 text-white border border-gray-700 bg-gray-900 hover:bg-gray-800 px-4 text-xl py-1 rounded-lg"><i class="fas fa-sign-in-alt mr-1"></i> Join Class</button>
                    <Link to="../create-class" className="ml-4 text-white border border-gray-700 bg-gray-900 px-4 text-xl py-1 rounded-lg hover:bg-gray-800"><i class="fas fa-plus-circle mr-1"></i> Create a Class</Link>
  
                    </div>
                    
          </div>
          <div id="error" className="hidden flex items-center justify-between">
              <p></p>
          <div className="ml-2 flex-shrink-0 flex">
   
          <p className="text-xl font-bold text-red-700 mt-4 mb-4">Something went wrong trying to do an action.</p>

           </div>     
</div>
     <div className="" >


    
        <div id="noClasses" className="hidden text-center mx-auto mt-20">
        <i class="fas fa-question-circle text-white text-7xl mb-4"></i>
        <h1 className="text-4xl w-full text-white">You are not enrolled in any classes.</h1>
        <p className="text-white mt-4 hidden">If you were told that you would be enrolled in your courses automatically. You may need to connect your LMS to CTFGuide.</p>

        </div>

    <div style={{cursor:'pointer'}} className=" hidden mt-4 hover:border-blue-500 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
    <div className=" items-center justify-between">
      <h1 className="text-2xl w-full">CYBSEC 121</h1>
  <a className=""><i class="ml-1 fas fa-calendar-alt"></i> Enrolled 5/14/22 - 12/2/22</a> • <a className=""><i class="fas fa-chalkboard-teacher"></i> Instructed by Paul C, Santiago L <br></br> <i className="fa fa-check"></i> Issued by Garnet Valley SD</a>
    
                    
    
      </div>
     
    </div>


    {

            classes.data.map((item) => (


  



<Link to={"./" + (item.classId)} style={{cursor:'pointer'}}>
    <div  className=" mt-4 hover:border-blue-500 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
<div className=" items-center justify-between">
  <h1 className="text-2xl w-full">{item.name} </h1> 
  <a className=""><i class="fas fa-chalkboard-teacher"></i> Instructed by {item.teachers[0]} <br></br>{item.organization}</a>
<p>
                {item.description}
    </p> 

  </div>
  </div>
</Link>





            ))
    }
  

    </div>



                </div>

             

                
            </main>

        
        </div>


    )


}




export default Classes;