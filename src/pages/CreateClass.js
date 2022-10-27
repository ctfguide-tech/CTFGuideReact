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

const CreateClass = () => {
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

                document.getElementById("userorg").innerHTML = "@" + firebaseUser.email.split("@")[1];

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

    function saveClass() {
        let className = document.getElementById("className").value;
        let classDescription = document.getElementById("courseDesc").value;
        let orgLock = document.getElementById("orgLock").checked;

        if (!className || !classDescription) {
            alert("Please fill out all fields");
            return;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {


            if (this.readyState == 4 && this.status != 200) {
                alert("Error creating class");
            } else {
                window.location.href = "../classes";
            }
 
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/classes/create-class/standard?name=${className}&description=${classDescription}&orgLock=${orgLock}&uid=${localStorage.getItem("token")}`);
        xhttp.send();
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
<div>
   <div className="flex items-center justify-between">
                  
                    <p className={" text-white  text-4xl font-semibold"}> Create a new class</p>
                    <div className="ml-2 flex-shrink-0 flex">
               
                    <input id="classCode" className="hidden text-white border border-gray-700 bg-gray-900  px-4 text-xl py-1 rounded-lg focus:outline-none" placeholder="Class Code"></input>
                    <button onClick={joinClass} className="hidden ml-4 text-white border border-gray-700 bg-gray-900 hover:bg-gray-800 px-4 text-xl py-1 rounded-lg"><i class="fas fa-sign-in-alt mr-1"></i> Join Class</button>
                    <button className="ml-4 text-white border border-gray-700 bg-gray-900 px-4 text-xl py-1 rounded-lg hover:bg-gray-800"> Cancel Class Creation</button>
  
                    </div>
                     
          </div>
          <div id="error" className="hidden flex items-center justify-between">
              <p></p>
          <div className="ml-2 flex-shrink-0 flex">
   
          <p className="text-xl font-bold text-red-700 mt-4 mb-4">Something went wrong trying to do an action.</p>

           </div>     
</div>
     <div className="" >


    


    <div style={{cursor:'pointer'}} className=" hidden mt-4 hover:border-blue-500 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
    <div className=" items-center justify-between">
      <h1 className="text-2xl w-full">CYBSEC 121</h1>
  <a className=""><i class="ml-1 fas fa-calendar-alt"></i> Enrolled 5/14/22 - 12/2/22</a> • <a className=""><i class="fas fa-chalkboard-teacher"></i> Instructed by Paul C, Santiago L <br></br> <i className="fa fa-check"></i> Issued by Garnet Valley SD</a>
    
                    
    
      </div>
     
    </div>

        <h1 className="mt-5 mb-1 text-white text-2xl">Class Name<span className="text-red-500">*</span></h1>
        <input id="className" className="w-1/2 text-white bg-gray-900 py-1 px-5 focus:outline-none border border-gray-700 rounded-lg" placeholder="Students should be able to identify your course easily"></input>
  
      
        <div id="orgDetails" class="hidden mt-4 bg-gray-900 rounded-lg  py-4 border border-gray-700 text-white px-3 w-2/4">
            <p class="text-md">The ID you entered is for the following organization.</p>
            <ul>
                <li>Organization Name: <span id="orgName"> ?</span></li>
                <li>Organization Owner: <span id="orgOwner"> ?</span></li>
                <li>Please ensure that this information is correct.</li>
            </ul>
        </div>

        
        <h1  className="mt-5 mb-1 text-white text-2xl">Course Description<span className="text-red-500">*</span></h1>
        <input id="courseDesc" className="w-1/2 text-white bg-gray-900 py-1 px-5 focus:outline-none border border-gray-700 rounded-lg" placeholder="Briefly explain on what your class offers"></input>
  
<div className="hidden">
        <h1 className="mt-5 mb-1 text-white text-2xl flex ">Organization Lock    <div className="ml-4 form-check focus:outline-none form-switch">
    <input id="orgLock" className="form-check-input appearance-none w-16 rounded-full float-left h-8 align-top bg-gray-900 bg-no-repeat bg-contain bg-gray-900 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch"></input>
  
  
  
  </div></h1>
 
        <p className="text-sm text-white italic">This will only allow accounts with emails ending with  <span id="userorg" className="font-semibold">unknown</span>.</p>
     </div>

   
     <br></br>

     <button onClick={saveClass} className="mt-5 px-5 py-2 bg-green-900 hover:bg-green-800 border-green-700 rounded-lg text-white">Save Changes</button>
     

</div>
    </div>

               

                <div className="text-white mt-4 text-xl border border-white w-1/2 px-4 py-4 rounded-lg shadow-2xl floating shadow-gray-500/50">

Upgrade to <span className="bg-gray-800 px-2 font-semibold"><i class="fas fa-crown"></i> CTFGuide for Education</span> to have larger classes, organization locks, and more.
  <br></br><br></br>
<a className="text-blue-500 hover:text-blue-600" href="../settings/billing"><i class="far fa-credit-card"></i> Upgrade now for just <b>$5/month</b>.</a>

</div>
</div>

          
                
            </main>

        
        </div>


    )


}




export default CreateClass;