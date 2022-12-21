import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Navigation } from '../components/navigation';
import { io } from "socket.io-client";
import DashboardManager from "../modules/DashboardManager.js"
import 'animate.css';
import { data } from "autoprefixer";
const Dashboard = () => {

  console.log("START\N\N\N" + process.env.REACT_APP_projectId)
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
  let uid = "pending"
  const auth = getAuth();

  //const socket = io("http://localhost:3002");

  function tutorialDone() {
    // send http request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 & this.status === 200) {
        window.location.reload();
      }
    }
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/tutorial?uid=${localStorage.getItem('token')}&status=complete`);
    xhttp.send();
  }

  if (!localStorage.getItem("22-18-update")) {
    localStorage.setItem("22-18-update", true)
  }
  const [open, setOpen] = useState(true)
  const [open2, setOpen2] = useState(localStorage.getItem("22-18-update") === "true" ? true : false)



  const [show, setShow] = useState(true)
  const cancelButtonRef = useRef(null)
  document.title = "CTFGuide - Dashboard"
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    imageUrl: 'https://ctfguide.com/demopfp.png'
  });
  var username = "??"
  if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
  }

  const [userData, setUserData] = useState({
    streak: 0,
    continueWorking: [],
    username: username,
    points: 0,
    tutorialCompleted: false
  })


  useEffect(() => {


    onAuthStateChanged(auth, (firebaseUser) => {

      //localStorage.setItem("token", firebaseUser.uid)

      if (!localStorage.getItem("token")) {
        window.location.href = "/login"
      }
      if (firebaseUser) {
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

            if (document.getElementById("navPoints")) {
              document.getElementById("navPoints").innerHTML = data.points;
            }
            console.log("data", data);

            if (document.getElementById("navPoints2")) {
              console.log("mobile")
              document.getElementById("navPoints2").innerHTML = data.points;
            }
            console.log(data)
            if (!data.streak) data[`streak`] = 0;
            if (!data.continueWorking) data[`continueWorking`] = []



            if (data.vmPassword) {
              document.getElementById("warning").classList.add("hidden")
            } else {
              console.log("EGg")
              setTimeout(function () {
                document.getElementById("warning").classList.add("hidden")
              }, 4000)

              // set up vm stuff
              console.log(firebaseUser.uid)
              uid = firebaseUser.uid;
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function () {
                if (this.readyState === 4 & this.status === 200) {
                  window.location.reload();
                }
              }
              xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/createvm?uid=${firebaseUser.uid}`);
              xhttp.send();

            }

            console.log(data.tutorialCompleted)

            setUserData({
              username: data.username,
              streak: data.streak,
              continueWorking: data.continueWorking,
              points: data.points,
              tutorialCompleted: data.tutorialCompleted
            })

            // get challenge date given history
            if (data.history) {
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function () {
                if (this.readyState === 4 & this.status === 200) {
                  let data2 = JSON.parse(this.responseText);
                  console.log(data)
                  document.getElementById("noHistory").classList.add("hidden")

                  document.getElementById("history").classList.remove("hidden")
                  document.getElementById("history_title").innerHTML = data2.title;
                  document.getElementById("historylink").href = "./challenges/" + data2.id;
                }
              }
              xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/specific/${data.history[data.history.length - 1]}`);
              xhttp.send();
            }

            if (data.tutorialCompleted === false) {
              document.getElementById("tutorial_banner_core").classList.remove("hidden")
              if (localStorage.getItem("tutorial_phase") == 1) {
                document.getElementById("dashboard_tutorial").classList.remove("hidden")
              }

              if (localStorage.getItem("tutorial_active")) {
                console.log("tutoraila ctivito ")
                document.getElementById("tutorial_banner").classList.add("hidden")
              }
            }

            document.getElementById("fetchingHistory").classList.add("hidden");
            if (data.continueWorking.length < 1) document.getElementById("noHistory").classList.remove("hidden")

            document.getElementById("loader").classList.add("hidden");
            document.getElementById("navPoints").innerHTML = data.points;
            document.getElementById("navPoints2").innerHTML = data.points;

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function dashboardTutorial() {
    document.getElementById("dashboard_tutorial").classList.remove("hidden")
  }
  function dashboardTutorialDone() {
    window.location.href = "../practice/all"
  }

  window.onload = function () {


  }

  return (

    <div className="min-h-full " style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: "#161716" }}>

      <Navigation />

      <div id="message" className=" mt-0 bg-yellow-900">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex">
   

            <div>
              <p className="text-white font-medium">
                <span className="text-white">We are currently in beta. </span>
                <a href="https://discord.gg/8Z7Y4Z7" className="text-white font-medium underline">
                  Join our Discord
                </a>
                <span className="text-white"> to get updates and help us improve!</span>
              </p>

            </div>

            <div className="ml-auto pl-3">
            <button
              type="button"
              className="flex  rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => {
                document.getElementById("message").classList.add("hidden")
              }
              }
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />

              <p className="text-white ">Hide</p>
            </button>
            </div>
          </div>

        </div>
      </div>




      <div id="dev" className="hidden relative bg-blue-900">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="pr-16 sm:text-center sm:px-16">
            <p className="font-medium text-white">
              <span className="md:hidden">Welcome to the new CTFGuide.</span>
              <span className="hidden md:inline">Welcome to the new CTFGuide! We're still working on releasing all the new features.</span>
              <span className="block sm:ml-2 sm:inline-block">
                <a href="https://www.notion.so/ctfguide/CTFGuide-V2-Preview-397bddf3083d4eb6ae1f6b58d3af2e23" className="text-white font-bold underline">
                  {' '}
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </span>
            </p>
          </div>
          <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
            <button
              type="button"
              className="flex p-2 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => {
                document.getElementById("dev").classList.add("hidden")
              }
              }
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>


      <main className="mt-6" >





        <div className="max-w-7xl mx-auto p y-6 px-4 sm:px-6 lg:px-8 ">

          <div id="loader" className="py-10 mb-10 hidden">
            <h1 className="text-white text-4xl text-center"><i className="fas fa-spinner text-white  fa-spin"></i> Preparing for blast off</h1>
            <p className="text-white text-center">You're probably going to see this a lot during the beta as our cache system hasn't been setup yet.</p>

          </div>


          <p className="text-yellow-500 mb-3 hidden"><i className="fas fa-tools"></i> <b>Developer Broadcast</b> The following services aren't avaliable: Learning Paths, Progress, Challenge Solving, Classes, CTFLive, Friends, Settings, Billing, Terminals and more.</p>
          <p className="text-yellow-500 mb-3 hidden">If you are seeing this message it means the CTFGuide API is offline.</p>
          <p className="text-yellow-500 mb-3 hidden">This is a site wide broadcast. Hi!</p>

          <div id="tutorial_banner_core" className="hidden">

            <div id="tutorial_banner" className={" rounded-xl bg-gray-900 border  border-gray-700 mb-10 max-w-7xl mx-auto py-12 px-4 sm:px-3 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between"}>
              <div className="w-full">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                  <span className="block text-white"><i className="fa-solid fa-hand-wave"></i> Welcome to CTFGuide!</span>
                  <span className="block text-blue-600">Mind if we show you around?</span>
                  <a
                    onClick={() => {
                      localStorage.setItem("tutorial_active", true);
                      localStorage.setItem("tutorial_phase", 1)

                      dashboardTutorial();
                    }}
                    href="#"
                    className="mt-4 inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Tutorial
                  </a>

                  <a
                    onClick={() => { tutorialDone() }}
                    className="mt-4 ml-2 inline-flex border  border-gray-100 items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white "
                  >
                    No thanks
                  </a>
                </h2>
              </div>

              <img width="300" className="" src="../egg.svg"></img>
            </div>

          </div>
          <div style={{ backgroundColor: "#212121"}}className=" px-12 py-10 rounded-lg flex align-middle">
            <input id="file-input" type="file" name="name" className={"hidden"} onChange={() => { window.alert("recieved but not saved. this is intended behavior.") }} accept={"image/png"} />

            <div onMouseOver={() => { /*document.getElementById('editpfp').classList.remove('hidden')*/ }} onMouseLeave={() => {
              document.getElementById('editpfp').classList.add('hidden')
            }} className={"relative"}>
              <img className="rounded-full w-full " src={user.imageUrl} alt="" />
              <div id={"editpfp"} onClick={() => { document.getElementById('file-input').click(); }} style={{ bottom: "0px", cursor: 'pointer' }} className={"hidden rounded-b-full text-white absolute  px-4 opacity-80  bg-black"}>
                <p>Edit</p></div></div>
            <h1 className="text-white text-4xl ml-4 ">Hello {userData.username} <br></br><span className="  align-middle align-center border  border-slate-400 text-slate-200 rounded-lg px-2 py-1 text-sm" ><i className="fas fa-check-circle text-slate-200"></i> CTFGuide Employee</span>&nbsp;<span className=" align-middle align-center border border-slate-400 text-slate-200  rounded-lg px-2 py-1 text-sm" ><i className="fas fa-bolt text-slate-200"></i> CTFGuide Pro</span></h1>

          </div>



          <div className="mt-5 grid lg:grid-cols-3 gap-10 sm:grid-cols-1">


            <div className="lg:col-span-2 sm:col-span-1">
              <h1 className="text-xl text-white tracking-tight mt-4  mb-2" style={{color: "#595959"}}> CONTINUE WORKING ON</h1>

              <div id="fetchingHistory" className="mt-1    px-4 py-4 text-white rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl">Fetching History...</h1>
                  </div>


                </div>
              </div>

              <div id="noHistory" className="hidden mt-2   px-4 py-6 text-white rounded ">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl">☹️ Nothing here yet. Head on to the <span>Practice</span> page to get started.</h1>
                  </div>


                </div>
              </div>





              <div id="history" style={{backgroundColor: "#212121"}} className="hidden    px-9 py-6 text-white rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl"> <span id="history_title"></span></h1>
                  </div>

                  <div className="ml-2 flex-shrink-0 flex">
                    <a id="historylink" className="px-2 py-1 bg-green-700 rounded-lg hover:bg-green-600"> Resume Activity</a>
                  </div>
                </div>

              </div>

              <h1 className="text-xl text-white tracking-tight mt-10  mb-2" style={{color: "#595959"}}> DISCOVER</h1>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 ">

<div
  onClick={() => { window.location.href = './learn/chapter1/lesson1' }}
  className="relative rounded-lg   px-6 py-5 shadow-sm flex space-x-3 hover:border-gray-600 "
  style={{backgroundColor: "#212121"}}
>
  <div className="flex-shrink-0">

  </div>
  <div className="flex-1 min-w-0">

    <a href="./learn/chapter1/lesson1" className="focus:outline-none">
      <span className="absolute inset-0" aria-hidden="true" />
      <p className="text-xl font-medium text-gray-100">Cybersecurity Basics <span id="c1done" className="hidden text-sm bg-green-800 rounded-lg px-2">Completed</span></p>
      <hr className="border-gray-700 mt-2 mb-3"></hr>
            <p className="text-white"> 
              Build your cybersecurity fundementals in this lesson. Learn about the basics of cybersecurity, and how to protect yourself online.
            </p>
    </a>
  </div>
</div>

<div
style={{backgroundColor: "#212121"}}
  className="relative rounded-lg   px-6 py-5 shadow-sm flex  space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
>
  <div className="flex-shrink-0">

  </div>
  <div className="flex-1 min-w-0">

    <a href="#" className="focus:outline-none">

      <p className="text-xl font-medium text-gray-100">Linux Basics</p>
      <hr className="border-gray-700 mt-2 mb-2"></hr>
            <p className="text-white">
              Learn the basics of Linux and how to use it. This lesson will teach you how to use the CTFGuide terminal, and how to use Linux commands.
            </p>
    </a>
  </div>

</div>




</div>




              <h1 className="text-4xl text-white mt-6 mb-4 align-middle hidden"> Learn  <span className="align-middle hidden text-xl font-semibold italic text-yellow-500">N E W !</span></h1>



              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 hidden">

                <div
                  onClick={() => { window.location.href = './learn/chapter1/lesson1' }}
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
                  <div className="flex-1 min-w-0">

                    <a href="#" className="focus:outline-none">

                      <p className="text-xl font-medium text-gray-100">Linux Basics</p>
                      <hr className="border-gray-700 mt-2 mb-2"></hr>
                      <ul className="text-white">
                        <li>This lesson isn't avaliable yet.  </li>

                      </ul>
                    </a>
                  </div>

                </div>




              </div>

              <h1 className="text-4xl text-white mt-6 mb-4 align-middle hidden"> Learning Path <span className="align-middle text-xl font-semibold italic text-yellow-500">Coming soon!</span></h1>

              <div className="blur-sm hidden" disabled>
                <div className="mt-2 bg-gray-900 border  border-gray-700  px-4 py-4 text-white rounded ">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl w-full"><i className="fas fa-search"></i> Exploratory Cybersecurity</h1>
                    <div className="ml-2 flex-shrink-0 flex w-1/2">
                      <div className="w-full bg-gray-900 border border-gray-700 rounded-full">
                        <div className="bg-gradient-to-br from-green-600 to-green-900  text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{ width: '25%' }}> 25%</div>

                      </div>

                    </div>


                  </div>

                  <div className="flex items-center justify-between">



                    <div>

                      <p className="mt-4 uppercase">Up next</p>
                      <i className="far fa-play-circle"></i> Video Lesson - Cyberwhatnow?
                    </div>
                    <div className="ml-2 flex-shrink-0 flex w-1/10">
                      <button className="border border-green-600 px-4 py-1 rounded-lg hover:bg-gray-800">Start Lesson</button>
                    </div>
                  </div>
                </div>


                <div className=" mt-4 bg-gray-900 border  border-gray-700   px-4 py-4 text-white rounded ">

                  <div className="flex items-center justify-between">
                    <h1 className="text-xl"><i className="fab fa-linux"></i> Linux 101</h1>
                    <div className="ml-2 flex-shrink-0 flex w-1/2">
                      <div className="w-full bg-gray-900 border border-gray-700 rounded-full">
                        <div className="bg-gradient-to-br from-green-600 to-green-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{ width: '25%' }}> 25%</div>
                      </div>

                    </div>


                  </div>
                  <div className="flex items-center justify-between">
                    <div>

                      <p className="mt-4 uppercase">Up next</p>
                      <i className="far fa-play-circle"></i> Video Lesson - Accessing other servers
                    </div>
                    <div className="ml-2 flex-shrink-0 flex w-1/10">
                      <button className="border border-green-600 px-4 py-1 rounded-lg hover:bg-gray-800">Start Lesson</button>
                    </div>
                  </div>
                </div>


              </div>
              <br></br>
              <Link to="../learn" className="text-white mt-10 px-3 rounded-lg  hidden  py-1 bg-blue-900 rounded-lg ">Looking for more lessons?</Link>
              <br></br><br></br>
              <div className="">






              </div>



         
            </div>


            <div className="">
            <h1 className="text-xl text-white tracking-tight mt-4  mb-2" style={{color: "#595959"}}> YOUR PROGRESS</h1>

              <div className=" text-white rounded mx-auto  ">
           
              <FireIcon className="hidden h-12 w-12 mx-auto  text-center  text-yellow-500" aria-hidden="true" /> 
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-yellow-400 inline-flex text-center">  {userData.streak} day streak</h1>
                <p className="text-sm mt-1 tracking-tight " style={{color: "#595959"}}>You haven't solved a challenge yet today. Make sure you solve one to maintain your streak!</p>
                
                <h1 className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400 inline-flex text-center">  #45th </h1>
                <p className="text-sm mt-1 tracking-tight " style={{color: "#595959"}}>This is your placement on the global leaderboards.</p>


              </div>

              <h1 className="text-xl text-white tracking-tight mt-4  mb-2" style={{color: "#595959"}}> FRIENDS</h1>
              <div className=" text-white rounded mx-auto  ">
                <p className="text-sm mt-1 tracking-tight px-2 py-2 rounded-lg " style={{color: "#595959", backgroundColor: "rgb(33, 33, 33)"}}>You don't have any friends yet. Add some to see their progress!</p>
              </div>




              <div id="" className="mt-2 mb-2 text-white rounded">
                <div className="flex items-center justify-between mx-auto text-centered text-white">
                  <div className="mx-auto text-center">

                    <div className="text-white dark raised" data-ea-publisher="ctfguidecom" data-ea-type="text"></div>

                  </div>


                </div>

              </div>


              <div className="mx-auto text-center hidden  w-full flex">
                <a href="https://discord.gg/q3hgRBvgkX" className=" w-full px-10 mx-auto  text-xl px-2 py-3  text-white rounded-lg border border-gray-700 bg-gray-900"><i className="fab fa-discord mr-1"></i> Join our Discord</a>

              </div>
              <br></br>


              <a className="hidden" href="https://www.stickermule.com/unlock?ref_id=1511893701&utm_content=468x60&utm_medium=embed&utm_source=invite" target="_blank"><img alt="Custom Stickers, Die Cut Stickers, Bumper Stickers - Sticker Mule" border="0" height="60" src="https://assets.stickermule.com/image/upload/v1531752798/banners/stickermule-invite-friends-medium.jpg" width="468" /></a>
              <br></br>


              <h1 className="hidden text-4xl text-white mb-4 mt-4"> Global Activity</h1>
              <div className="hidden bg-gray-900 border  border-gray-700  px-4 py-1 text-white rounded ">
                <p>Laphatize solved <span className="text-blue-500">Black Panther</span><br></br><span className="text-sm italic">5:45 PM</span></p>
              </div>
            </div>



          </div>



          <div className=" bg-gray-800 px-20 py-1 text-xl rounded-t-lg hover:bg-gray-700 hidden" style={{
            display: 'none',
            cursor: 'pointer',
            position: 'fixed',
            bottom: 0,
            right: '2%',
          }}>
            <h1 className="text-white flex "><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg> <span className="ml-2">Chat</span> <span className="bg-black text-white ml-4 rounded-lg px-3 text-md">7</span></h1>

          </div>

          <div className=" rounded-t-lg hover:bg-gray-700 " style={{
            cursor: 'pointer',
            position: 'fixed',
            bottom: 0,
            right: '2%',
          }}>
            <div className="bg-gray-800 px-20 py-1 text-xl">
              <h1 className="text-white flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg> <span className="ml-2">Chat</span> <span className="bg-black text-white ml-4 rounded-lg px-3 text-md">7</span></h1>
            </div>
            <div className="bg-gray-900 hidden ">
              <div>
                <ul role="list" className="divide-y divide-gray-200">
                  {activityItems.map((activityItem) => (
                    <li key={activityItem.id} className="w-full">
                      <div className="flex space-x-3 py-4 px-4">
                        <img className="h-6 w-6 rounded-full outline-none focus:outline-none" src={activityItem.person.imageUrl} alt="" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-white">{activityItem.person.name}</h3>
                            <p className="text-sm text-gray-500">{activityItem.time}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>




          {/* /End replace */}
        </div>
        <p className="hidden mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

      </main>



      <div
        aria-live="assertive"
        id="warning"
        className="hidden fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-80 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-80"
          >
            <div className="max-w-sm w-full opacity-80 bg-black border border-yellow-400 text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">

                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-white"><i className="fas fa-exclamation-triangle"></i> We're still setting you up...</p>
                    <p className="mt-1 text-sm text-gray-200">You won't be able to use our virtual terminals just yet.</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-black px-1 py-1 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>



      <div id="dashboard_tutorial" className="hidden fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity" aria-hidden="true"></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


          <div className="inline-block align-bottom shadow-lg shadow-blue-900/50 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
            <div>

              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-4xl leading-6 font-semibold text-white" id="modal-title">Dashboard</h3>
                <div className="mt-4">
                  <p className="text-xl px-5 text-white">The dashboard serves as an easy way for you to visualize your progress and helps find you the next thing to do. Your dashboard is specifically tailored for you.</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 mx-auto text-center">
              <button onClick={dashboardTutorialDone} type="button" className="hover:bg-gray-800 mt-3 w-1/2 text-xl inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-white text-base font-medium sm:mt-0 sm:col-start-1 ">Continue</button>
            </div>
          </div>
        </div>
      </div>

      <div id="dashboard_tutorial" className="hidden fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity" aria-hidden="true"></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


          <div className="inline-block align-bottom shadow-lg shadow-blue-900/50 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
            <div>

              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-4xl leading-6 font-semibold text-white" id="modal-title">Dashboard</h3>
                <div className="mt-4">
                  <p className="text-xl px-5 text-white">The dashboard serves as an easy way for you to visualize your progress and helps find you the next thing to do. Your dashboard is specifically tailored for you.</p>
                  <iframe className="mt-4 w-full px-5 mt-4 h-80" src="https://www.youtube-nocookie.com/embed/QU952BUA9Gk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; hide-info;"></iframe>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 mx-auto text-center">
              <button onClick={dashboardTutorialDone} type="button" className="hover:bg-gray-800 mt-3 w-1/2 text-xl inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-white text-base font-medium sm:mt-0 sm:col-start-1 ">Continue</button>
            </div>
          </div>
        </div>

      </div>
      <Transition.Root show={open2} as={Fragment}>

        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen2}>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div onClick={() => {
              setOpen2(false)
              localStorage.setItem("22-18-update", false)
            }}
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="flex items-end justify-center min-h-screen  pt-4 px-4  text-center sm:block sm:p-0">

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div style={{ fontFamily: 'Poppins, sans-serif' , backgroundColor: "#161716"}} className="max-w-6xl relative inline-block align-bottom w-5/6 pb-10 pt-10 bg-gray-900 border border-gray-700 rounded-lg px-20 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
                <div>

                  <div className="mt-3  sm:mt-5">
                    <h1 className="text-white text-4xl"><i className="far fa-newspaper"></i> Platform News <span className="italic text-sm">Sunday, Dec 18 2022</span></h1>
                    <hr className="border-gray-600 mt-4"></hr>
                    <br></br>

                    <h1 className="text-white text-xl">What's changed?</h1>
                    <ul>
                      <li className="text-white text-md hidden">• Added Global Activity to your dashboard. You can see recent solves globally.</li>
                      <li className="text-white text-md">• We've cleaned up the leaderboards UI/UX.</li>
                      <li className="text-white text-md">• Fixed bugs regarding switching difficulty of challenges you want to see.</li>
                      <li className="text-white text-md">• Basic moderation system setup for comments.</li>
                      <li className="text-white text-md">• Platform News to keep the community updated. Aka this modal.</li>
                    </ul>
                    <br></br>
                    <h1 className="text-white text-xl">Other News.</h1>
                    <ul>
                      <li className="text-white text-md">We've expanded our team and have a new co-founder.</li>

                      <div className="flex gap-x-4 mb-4 mx-auto text-center">
                        <div className="mt-4 mx-auto text-center ">
                          <img width="60" className="rounded-full mx-auto" src="https://avatars.githubusercontent.com/u/67762433?v=4"></img>
                          <h1 className="text-white">Raymond Yan</h1>
                          <h1 className="text-white text-sm">Co-founder &<br></br> Head of Engineering</h1>

                        </div>
                        <div className="mt-4 mx-auto text-center">
                          <img width="60" className="rounded-full mx-auto" src="https://media.licdn.com/dms/image/C5603AQES6Hp4D9MXjg/profile-displayphoto-shrink_200_200/0/1588608773250?e=1677110400&v=beta&t=9W9CEMEIcDG0iSkBj6RpvH8a9gxV-nhfv8BzBsPmkNg"></img>
                          <h1 className="text-white">Joshua Herron</h1>
                          <h1 className="text-white text-sm">Sandbox Engineer</h1>

                        </div>

                        <div className="mt-4 mx-auto text-center ">
                          <img width="60" className="rounded-full mx-auto" src="https://media.licdn.com/dms/image/D4E03AQEY9G-O77b3ng/profile-displayphoto-shrink_200_200/0/1668423394884?e=1677110400&v=beta&t=gKZkxkCZytaKdwsIGwBUWudOgnH9gFd_D3Upqt8T15Y"></img>
                          <h1 className="text-white">Srihari Raman</h1>
                          <h1 className="text-white text-sm">
                            Director of Analytics & <br></br> Customer Acquisition</h1>

                        </div>
                        <div className="mt-4 mx-auto text-center">
                          <img width="60" className="rounded-full mx-auto" src="https://cdn.discordapp.com/attachments/1035971879283990648/1045457965001478195/image.png"></img>
                          <h1 className="text-white">Abhinav Byreddy</h1>
                          <h1 className="text-white text-sm">System Architect</h1>

                        </div>
                      </div>
                      <div className="flex gap-x-4 mx-auto text-center">

                      </div>
                    </ul>



                    <button className="hidden text-white mt-10 text-md bg-gray-800 px-4 py-1 rounded-full">Nevermind, I'll stick to the Free Plan.</button>
                  </div>
                </div>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

    </div>


  )


}




export default Dashboard;