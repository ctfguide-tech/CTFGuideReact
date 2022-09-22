import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon, CheckIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { io } from "socket.io-client";
import DashboardManager from "../../modules/DashboardManager.js"
import 'animate.css';
import { Navigation } from '../../components/navigation';
import YouTube  from "react-youtube";

const Ch2_1 = () => {
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


  const auth = getAuth();
  //const socket = io("http://localhost:3002");


  const [open, setOpen] = useState(true)
  const [show, setShow] = useState(true)
  const cancelButtonRef = useRef(null)
  document.title = "CTFGuide - Learn"
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

  function next() {
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("nextstep").innerHTML = "Continue"
        document.getElementById("nextstep").onclick = function() {
            window.location.href = "./activity1";
        }
    }
    };
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/progress?uid=${localStorage.getItem("token")}&lessoncode=c2l1`, true);
    xhttp.send();


  }
  const opts = {
    height: '390',
    width: '640',

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }

  const [Learn, setLearn] = useState({
    data: []
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
    xhttp.onreadystatechange = function () {
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
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 & this.status === 200) {
            let data = JSON.parse(this.responseText);
            document.getElementById("navPoints").innerHTML = data.points;

            setUserData({
              username: data.username,
              streak: data.streak,
              continueWorking: data.continueWorking,
              points: data.points
            })

            if (data.lessonsCompleted) {
              if (data.lessonsCompleted.includes("c2l1")) {
                  document.getElementById("nextstep").innerHTML = "Onward!"
                  document.getElementById("nextstep").onclick = function() {
                    window.location.href = "./activity1";
                }
              }
              
          }
            document.getElementById("loader").classList.add("hidden");


          }

          if (this.readyState === 4 & this.status === 500) {
            // User not registered via API
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
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




  
  const steps = [
    { id: '', name: 'Introduction to Linux', href: '/learn/chapter2/lesson1', status: 'inprogress' },
    { id: '', name: 'Review Activity', href: '/learn/chapter2/activity1', status: 'activity' },
    { id: '', name: 'Interacting with Linux', href: '/learn/chapter2/lesson2', status: 'learning' },
    { id: '', name: 'Linux on CTFGuide', href: '/learn/chapter2/lesson2', status: 'activity' },

  ]

  const navigation = [
    { name: 'Dashboard', href: '../dashboard', current: false },
    { name: 'Practice', href: '../practice', current: false },
    { name: 'Learn', href: './learn', current: true },
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

  window.onload = function () {
    if (localStorage.getItem("tutorial_phase") == 1) {
      document.getElementById("dashboard_tutorial").classList.remove("hidden")
    }

    if (localStorage.getItem("tutorial_active")) {
      document.getElementById("tutorial_banner").classList.add("hidden")
    }
  }

  return (

    <div className="min-h-full " style={{ fontFamily: 'Space Grotesk, sans-serif' }}>

      <Navigation />


      <main className="mt-3" >

        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8   ">

        
        <nav aria-label="Progress">
            <ol role="list" className="border bg-gray-900 border-gray-700 rounded-md divide-y divide-gray-900 md:flex md:divide-y-0">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex-1 md:flex">
                  {step.status === 'complete' ? (
                    <Link to={step.href} className="group flex items-center w-full">
                      <span className="px-6 py-2 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-600 rounded-full ">
                          <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                        </span>
                        <span className="ml-4 text-sm font-medium text-white">{step.name}</span>
                      </span>
                    </Link>
                  ) : step.status === 'learning' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-700 rounded-full">
                        <span className="text-white"><i class="fas fa-book"></i> {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'activity' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-700 rounded-full">
                        <span className="text-white"><i class="fas fa-pencil-alt"></i>  {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'inprogress' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full">
                        <span className="text-white"><i class="fas fa-book"></i> {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'inprogress_a' ? (
                    <a href={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full">
                        <span className="text-white"><i class="fas fa-pencil-alt"></i>  {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </a>
                  ) : (
                    <a href={step.href} className="group flex items-center">
                      <span className="px-6 py-4 flex items-center font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-700 rounded-full ">
                          <span className="text-white ">{step.id}</span>
                        </span>
                        <span className="ml-4 text-lg text-white ">{step.name}</span>
                      </span>
                    </a>
                  )}

                  {stepIdx !== steps.length - 1 ? (
                    <>
                      {/* Arrow separator for lg screens and up */}
                      <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                        <svg
                          className="h-full w-full text-gray-700"
                          viewBox="0 0 22 80"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0 -2L20 40L0 82"
                            vectorEffect="non-scaling-stroke"
                            stroke="currentcolor"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>






          {/*  YOU CONTENT STARTS HERE */}
          <div className="text-white">
            <br></br>

            <div className="flex items-center justify-between">
              <div>
            <h1 className="text-4xl font-semibold ">Introduction to Linux</h1>
            <p><i class="fas fa-info-circle"></i>  This lesson includes <a href="https://github.com/ctfguide-tech/Information/blob/main/lessons/lesson1.md" className="text-blue-300">externally sourced</a> content.</p>
            </div>
            <div className="ml-2 flex-shrink-0 flex w-1/10">
            <button id="nextstep" className=" text-white text-xl border border-gray-500 px-6 py-3 hover:bg-gray-900 rounded-lg"><i class="fas fa-spinner text-white  fa-spin"></i> Awaiting Completion</button>
                    </div>
                    </div>
           
            <p className="text-xl mt-6">
              Welcome to CTFGuide's Linux 101 course. This course is designed to teach you the basics of Linux. At the end of this course, you'll have a solid understanding on the history of Linux, connecting to your Linux server on CTFGuide, and know how to use basic Linux commands.

              <br></br><br></br>

              Linux is a free and open source operating system. It is developed by Linus Torvalds, a programmer and the creator of the Linux operating system. 
              Development of Linux originially started in 1991 and has quickly grown to be one of the most popular operating systems in the world.
              The syntax of Linux commands are very similar to that of Unix.

              You'll find that in the tech world, that the Linux operating system is the most popular choice for servers. Although, Windows and MacOS can still be used as servers.

              A plethora of cybersecurity tools are generally designed for Linux. There are many Linux Distributions that you can use, the most popular one for cybersecurity is Kali Linux. It's advised that you if you're entirely new to Linux you use a distribution like Ubuntu.

              <div className="mt-4 bg-yellow-900 border-yellow-500 border-2 rounded-lg p-4">
                <p className="text-xl">
                  <i class="fas fa-exclamation-triangle"></i>  CTFGuide servers use Ubuntu 20.04.3 LTS x86_64 as their default Linux distribution. But has most of tools you'll need to complete for challenges already install.
                </p>
              </div>

              <br></br>

              <br></br>
            </p>


           <br></br>
               

         </div>

          {/*  YOU CONTENT ENDS HERE */}


        </div>

      </main>


    </div>


  )


}




export default Ch2_1;