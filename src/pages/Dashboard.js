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

const Dashboard = () => {
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

  const socket = io("http://localhost:3002");

  setTimeout(function() {
      document.getElementById("warning").classList.add("hidden")
  },4000)

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
    username: "??"
  })

  
  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
  useEffect(() => {

    
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
        } else {
          setUser({
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            imageUrl:
              `https://ui-avatars.com/api/?name=${firebaseUser.email}&background=random`,
          });
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 & this.status === 200) {
            let data = JSON.parse(this.responseText);
            console.log(data)
            if (!data.streak) data[`streak`] = 0;
            if (!data.continueWorking) data[`continueWorking`] = []
            document.getElementById("myInfo").innerText = JSON.stringify(data, null, 3);
            
            if (data.tutorial === "finished") {
              document.getElementById("tutorial_banner").classList.add("hidden")
            }

            setUserData({
              username: data.username,
              streak: data.streak,
              continueWorking: data.continueWorking
            })
            document.getElementById("fetchingHistory").classList.add("hidden");
            if (data.continueWorking.length < 1)  document.getElementById("noHistory").classList.remove("hidden")


          }

          if (this.readyState === 4 & this.status === 500) {
            // User not registered via API
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState === 4 & this.status === 200) {
                window.location.reload();
              }
            }
            xhttp.open("GET", `http://localhost:3001/users/register?uid=${firebaseUser.uid}`);
            xhttp.send();
            
          }
        }
      
      xhttp.open("GET", `http://localhost:3001/users/data?uid=${firebaseUser.uid}`);
      xhttp.send();


      socket.emit('online', {
        uid: firebaseUser.uid,
      });

      setInterval(() => {      
        socket.emit('heartbeat', {
        uid: firebaseUser.uid,
      })}
      , 5000);

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
    { name: 'Dashboard', href: './dashboard', current: true },
    { name: 'Practice', href: './practice', current: false },
    { name: 'Classes', href: '#', current: false },
    { name: 'CTFLive', href: '#', current: false },
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

  function dashboardTutorialDone() {
    document.getElementById("dashboard_tutorial").classList.add("hidden")
  }

  return (

    <div className="min-h-full" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>

      <Disclosure as="nav" className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 ">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-14 w-14"
                      src="./CTFGuide trans dark.png"
                      alt="CTFGuide"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={item.onClick}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    onClick={item.onClick}

                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.name}</div>
                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name + "m"}
                      onClick={logout}
                      className="block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-gray-700"
                    >{item.name}</a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


      <main className="mt-6">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-yellow-500 mb-3 hidden"><i className="fas fa-tools"></i> <b>Developer Broadcast</b> The following services aren't avaliable: Learning Paths, Progress, Challenge Solving, Classes, CTFLive, Friends, Settings, Billing, Terminals and more.</p>
        <p className="text-yellow-500 mb-3 hidden">If you are seeing this message it means the CTFGuide API is offline.</p>
        <p className="text-yellow-500 mb-3 hidden">This is a site wide broadcast. Hi!</p>

      <div id="tutorial_banner" className="rounded-lg bg-gradient-to-br from-gray-900 to-black border border-gray-800 mb-10 max-w-7xl mx-auto py-12 px-4 sm:px-3 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <div className="w-full">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          <span className="block text-white"><i className="fa-solid fa-hand-wave"></i> Welcome to CTFGuide!</span>
          <span className="block text-blue-600">Mind if we show you around?</span>
          <a
              onClick={() => {
                localStorage.setItem("tutorial_active", true);
                localStorage.setItem("tutorial_phase", 1) 
                dashboardTutorialDone();
              }}
              href="#"
              className="mt-4 inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Tutorial
            </a>

            <a
              href="#"
              className="mt-4 ml-2 inline-flex border  border-gray-100 items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white "
            >
              No thanks
            </a>
        </h2>
                    </div>
    
      <img width="300" className="" src="../egg.svg"></img>
    </div>
         <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800  px-6 py-10 rounded-lg flex align-middle">

         <img className="rounded-full" src={user.imageUrl } alt="" /><h1 className="text-white text-4xl ml-4 mt-3">Hello { userData.username }</h1>
           </div>
 
          <div className="mt-5 grid lg:grid-cols-3 gap-10 sm:grid-cols-1">


            <div className="lg:col-span-2 sm:col-span-1">
              <h1 className="text-4xl text-white mb-4 "> Continue working on</h1>
              
              <div id="fetchingHistory" className="mt-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800  px-4 py-4 text-white rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl">Fetching History...</h1>
                    </div>


                  </div>
                </div>

                <div id="noHistory" className="hidden mt-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800   px-4 py-6 text-white rounded ">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl">☹️ Nothing here yet. Head on to the <span>Practice</span> page to get started.</h1>
                    </div>


                  </div>
                </div>
                    
                    

              {userData.continueWorking.map((activity1) => (

                <div key={activity1.name} className="mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-blue-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl"><span className="font-semibold">CTF Activity:</span> {activity1.name}</h1>
                      <p className="text-blue-600">@{activity1.author} <span className="text-gray-400">·</span> <span className="text-green-500">{activity1.difficulty}</span></p>
                    </div>

                    <div className="ml-2 flex-shrink-0 flex">
                      <button className="px-2 py-1 bg-green-700 rounded-lg hover:bg-green-600"> Start Activity</button>
                    </div>
                  </div>
                </div>
              ))}



                <div className="hidden bg-gray-900 px-5 py-3 border border-blue-800 rounded">
                  <div className="grid lg:grid-cols-5">
                    <div className="mx-auto">
                    <img width="100" src="./cybersec1.png"/>
                    </div>
                    <div className="col-span-4 py-3">
                    <h1 className="text-white text-xl">What is Cybersecurity?</h1>
                    <p className="text-white">In this lesson, we'll learn about what cybersecurity is and it's many applications in our world.</p>
                    </div>
                  </div>
                
                  
                </div>
      
                

                <h1 className="text-4xl text-white mt-6 mb-4 hidden"> Developer Message</h1>
                <p className="text-white hidden">Hey, did we load your stuff properly? We just did a database migration and we want to confirm that this looks normal with you.</p>
                <p className="text-green-500 bg-gray-900 mt-4 px-4 py-2 hidden" id="myInfo"></p>
            </div> 


            <div className="">
              <h1 className="text-4xl text-white mb-4"> Progress</h1>
              <div  className="mt-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800  px-4 py-4 text-white rounded ">
                <h1 className="text-xl font-semibold text-yellow-500 inline-flex text-center"> <FireIcon className="h-6 w-6 text-center mr-1" aria-hidden="true" />  {userData.streak} day streak</h1>
                <p>No activity today, yet!</p>
              </div>
       
        
    
            
            
            </div>

            

          </div>


          <div>
     <h1 className="text-4xl text-white mt-6 mb-4"> Learning Path</h1>
     <div className="mt-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800  px-4 py-4 text-white rounded ">
<div className="flex items-center justify-between">
  <h1 className="text-xl w-full"><i className="fas fa-search"></i> Exploratory Cybersecurity</h1>
  <div className="ml-2 flex-shrink-0 flex w-1/2">
  <div className="w-full bg-gray-900 border border-gray-700 rounded-full">
  <div className="bg-gradient-to-br from-green-600 to-green-900  text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: '25%'}}> 25%</div>

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


<div className=" mt-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800  px-4 py-4 text-white rounded ">
<div className="flex items-center justify-between">
  <h1 className="text-xl"><i className="fab fa-linux"></i> Linux 101</h1>
  <div className="ml-2 flex-shrink-0 flex w-1/2">
  <div className="w-full bg-gray-900 border border-gray-700 rounded-full">
  <div className="bg-gradient-to-br from-green-600 to-green-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: '25%'}}> 25%</div>
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

              <div className="hidden bg-gray-800 px-20 py-1 text-xl rounded-t-lg hover:bg-gray-700 hidden" style={{
                display:'none',
                cursor: 'pointer',
                position: 'fixed',
                bottom: 0,
                right: '2%',   
              }}>
                <h1 className="text-white flex hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg> <span className="ml-2">Chat</span> <span className="bg-black text-white ml-4 rounded-lg px-3 text-md">7</span></h1>
            
              </div>

              <div className=" rounded-t-lg hover:bg-gray-700 hidden" style={{
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
              <img className="h-6 w-6 rounded-full" src={activityItem.person.imageUrl} alt="" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">{activityItem.person.name}</h3>
                  <p className="text-sm text-gray-500">{activityItem.time}</p>
                </div>
                <p className="text-sm text-gray-500">
                  wtf bruh why did u...
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
        <p className="mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>
      </main>
      <div
        aria-live="assertive"
        id="warning"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
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
                      className="bg-black px-1 py-1 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
       

      <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 hidden">
      <div className="max-w-7xl mx-auto px-2  sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-black  border shadow-lg sm:p-3">
          <div className="py-10 flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
      
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">Tutorial: </span>
                <span className="hidden md:inline font-semibold">This is your dashboard.</span>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/P3TwUfUqc78" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-900 text-white border border-white"
              >
                Continue
              </a>
            </div>
     
          </div>
        </div>
      </div>


    </div>

    <div className="hidden fixed z-10 inset-0 overflow-y-auto" id="dashboard_tutorial" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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

    </div>


  )


}




export default Dashboard;