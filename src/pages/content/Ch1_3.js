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

const Ch1_3 = () => {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

  // Initialize Firebase


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

  function nextstep() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    window.location.href = "../../learn";
  
    }
    };
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/progress?uid=${localStorage.getItem("token")}&lessoncode=c1l2`, true);
    xhttp.send();


  }
  const opts = {
    height: '390',
    width: '640',

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
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


    { id: '', name: 'What Is Cybersecurity?', href: '/learn/chapter1/lesson1', status: 'learning' },
    { id: '', name: 'Review Activity', href: '/learn/chapter1/activity1', status: 'activity' },
    { id: '', name: 'Staying Safe Online', href: '/learn/chapter1/lesson2', status: 'inprogress' },
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

    <div className="min-h-full " style={{ fontFamily: 'Poppins, sans-serif' }}>

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
            <h1 className="text-4xl font-semibold ">Surfin' Safe</h1>
          </div>
            <div className="ml-2 flex-shrink-0 flex w-1/10">
            <button onClick={nextstep} className=" text-white text-xl border border-gray-500 px-6 py-3 hover:bg-gray-900 rounded-lg"><i class="fas fa-check text-white"></i> Finish Course</button>
                    </div>
                    </div>
           
            <p className="text-xl mt-6">
         
                    The internet is a pretty great place. It's probably the only place where you'll find teenagers laughing at an oversatured image of a frog. But, it also has a lot of bad stuff like malware, phishing, and scams. Let's learn how you can protect yourself from these attacks.

              <br></br><br></br>

              There are a few things you can do to stay safe on the internet. First, make sure that you have a strong password for all of your accounts and that you never use the same password for more than one account. Second, be careful about what information you share online and make sure that you only share information with people who you know and trust. Finally, be aware of the potential dangers of clicking on links or downloading files from unknown sources. If you follow these guidelines, you should be able to stay safe while using the internet.   <br></br>

              <br></br>
              There are a few things you can do in order to detect if a link is legitimate or not. The first step is to check the URL of the link to see if it is a valid website. If the website looks legitimate, the next step is to hover over the link to see where it is taking you. If the destination looks legitimate, then you can click on the link. However, if at any point during these steps you feel like something is not right, it is probably best to not click on the link.
            </p>

    
           <br></br>
               

         </div>

          {/*  YOU CONTENT ENDS HERE */}


        </div>

      </main>


    </div>


  )


}




export default Ch1_3;