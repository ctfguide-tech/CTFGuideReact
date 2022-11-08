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


  const [open, setOpen] = useState(false)
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
            <p className="hidden"><i class="fas fa-info-circle"></i>  This lesson includes <a href="https://github.com/ctfguide-tech/Information/blob/main/lessons/lesson1.md" className="text-blue-300">externally sourced</a> content.</p>
            </div>
            <div className="ml-2 flex-shrink-0 flex w-1/10">
            <button id="nextstep" className=" text-white text-xl border border-gray-500 px-6 py-3 hover:bg-gray-900 rounded-lg">Continue</button>
                    </div>
                    </div>
           
            <p className="text-xl mt-6">
              Welcome to CTFGuide's Linux 101 course. This course is designed to teach you the basics of Linux. At the end of this course, you'll have a solid understanding on the history of Linux, connecting to your Linux server on CTFGuide, and know how to use basic Linux commands.

              <br></br><br></br>
              <h2 className="text-2xl font-semibold mb-1 text-blue-500">What is Linux?</h2>
              Linux is a free and <span className="text-yellow-400" onClick={() => {setOpen(true)}} style={{cursor:'pointer'}} id="tooltip"><i class="far fa-star text-sm"></i> open source</span> operating system. It is developed by Linus Torvalds, a programmer and the creator of the Linux operating system. 
              Development of Linux originially started in 1991 and has quickly grown to be one of the most popular operating systems in the world.
              The syntax of Linux commands are very similar to that of Unix.

              You'll find that in the tech world, that the Linux operating system is the most popular choice for servers. Although, Windows and MacOS can still be used as servers.

              A plethora of cybersecurity tools are generally designed for Linux. There are many Linux Distributions that you can use, the most popular one for cybersecurity is Kali Linux. It's advised that if you're new to Linux you use a distribution like Ubuntu.

              <div className="hidden mt-4 bg-yellow-900 rounded-lg px-2 py-1">
                <p className="text-sm">
                  <i class="fas fa-exclamation-triangle"></i>  CTFGuide servers use Ubuntu 20.04.3 LTS x86_64 as their default Linux distribution. Most of tools you'll need to complete for challenges are already installed.
                </p>
              </div>

              <h2 className="text-2xl font-semibold mb-1 mt-4 text-blue-500">Understanding the Linux architecture.</h2>
<div className="grid grid-cols-2">
  <div className="column">
  <p>Linux architecture is based on a modular approach. The kernel, which is the core of the operating system, manages the resources of the computer and provides services to applications. The shell is a command line interpreter that allows users to interact with the kernel. The hardware consists of the physical components of the computer, such as the processor, memory, and storage devices. The utilities are programs that provide functions that are not directly related to the operation of the computer, such as text editors and file managers.</p> 

    </div>
    <div className="column mx-auto text-center">
    <img className="w-80 mx-auto text-center" src="../../arch2.png"></img>

    </div>
</div>
              <br></br>

              <br></br>
            </p>


           <br></br>
               

         </div>

          {/*  YOU CONTENT ENDS HERE */}


        </div>

      </main>
              
      <Transition.Root show={open} as={Fragment} style={{ fontFamily: 'Space Grotesk, sans-serif', overflow:'hidden'}} className="test">
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="test bg-gradient-to-br from-gray-900 to-black border border-gray-800 h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-white text-2xl">What is open source?</Dialog.Title>
                    <div class="hidden bg-gray-800 rounded-lg px-4 py-2 mt-4">


                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-white  uppercase">Hint 1</p>
                        
                        </div>
                        <div class="ml-2 flex-shrink-0 flex w-1/10">
                          <button class="border text-white border-green-500 px-4 py-1 rounded-lg hover:bg-gray-900">Unlock Hint</button>
                          </div>
                          </div>
                  
                  
                  
                  
                    </div>

                    <div class="hidden bg-gray-800 rounded-lg px-4 py-2 mt-4">


<div class="flex items-center justify-between">
  <div>
    <p class="text-white  uppercase">Hint 2</p>
    
    </div>
    <div class="ml-2 flex-shrink-0 flex w-1/10">
      <button class="border text-white border-green-500 px-4 py-1 rounded-lg hover:bg-gray-900">Unlock Hint</button>
      </div>
      </div>




</div>

<div class="hidden bg-gray-800 rounded-lg px-4 py-2 mt-4">


<div class="flex items-center justify-between">
  <div>
    <p class="text-white  uppercase">Answer</p>
    
    </div>
    <div class="ml-2 flex-shrink-0 flex w-1/10">
      <button class="border text-white border-orange-500 px-4 py-1 rounded-lg hover:bg-gray-900">Upgrade to PRO</button>
      </div>
      </div>




</div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="text-white">

                      <img src="https://st2.depositphotos.com/5240153/8821/v/450/depositphotos_88210338-stock-illustration-open-source-code-program-technology.jpg"></img>
                    <h1 className=" text-xl mb-2 mt-4 font-bold text-blue-500 "><i class="fas fa-book"></i> Definition:</h1>
                 
                    Open source software is software that is freely available for anyone to download and use. The source code for open source software is also available for anyone to view and modify. This allows for a community of developers to work together to improve the software.
                    <hr className="mt-4 mb-4 border-gray-700"></hr>
                    <h1 className=" text-xl mt-2 text-blue-500"><i class="far fa-lightbulb"></i> Examples:</h1>
                    <div className="mt-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <h1>
                        <span className="text-yellow-400">Linux</span> - A free and open-source operating system for computers, servers, mobile devices, and embedded systems.
                    </h1>
                    </div>
                    <div className="mt-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <h1>
                      <span className="text-yellow-400">  Mozilla Firefox</span> - A free and open-source web browser developed by the Mozilla Foundation.

                    </h1>
                    </div>
                    <div className="mt-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <h1>
                      <span className="text-yellow-400">VLC media player</span> - A free and open-source cross-platform multimedia player and framework that plays most multimedia files as well as DVDs, Audio CDs, VCDs, and various streaming protocols.
                    </h1>
                    </div>
                    <div className="mt-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <h1>
                      <span className="text-yellow-400">    Chromium</span> - A free and open-source web browser developed by Google, intended to provide a safer, faster, and more stable way for all users to experience the web.
                    </h1>
                    </div>
                    <div className="mt-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <h1>
                      <span className="text-yellow-400">    CTFGuide </span>- A free and open-source CTF learning platform.
                    </h1> 
                    </div>
                   
                   
                 </div>
                    {/* /End replace */}
               
               
                    <div className="text-white hidden">
                    <h1 className=" text-xl mb-2">How do hints work?</h1>
                    <p>Your first hint will only allow you to earn 1/2 of the points avaliable for this challenge.</p>
                    <br/>
                    <p>Your second hint will only allow you to earn 1/3 of the points avaliable for this challenge.</p>
                    <br/>
                    <p>Viewing the answer will simply mark the challenge solved for you and not award you any points. This feature is only for pro members.</p>

                 </div>

                 
          



                  </div>


               
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    </div>


  )


}




export default Ch2_1;