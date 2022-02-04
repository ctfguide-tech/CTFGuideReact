import { Link } from "react-router-dom";

import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { io } from "socket.io-client";

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

  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)
  document.title = "CTFGuide - Dashboard"
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    imageUrl: 'https://ctfguide.com/demopfp.png'
  });

  const [userData, setUserData] = useState({
    streak: 0,
    continueWorking: []
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
              "https://ui-avatars.com/api/?name=laphatize&background=random",
          });
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 & this.status === 200) {
            let data = JSON.parse(this.responseText);
            if (!data.streak) data[`streak`] = 0;
            if (!data.continueWorking) data[`continueWorking`] = []
            document.getElementById("myInfo").innerText = JSON.stringify(data, null, 3);
            setUserData({
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


  return (

    <div className="min-h-full" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>

      <Disclosure as="nav" className="bg-gradient-to-br from-gray-800 to-gray-900">
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
        <p className="text-yellow-500 mb-3 hidden">If you are seeing this message it means the CTFGuide Magic Gateway is offline.</p>
        <p className="text-yellow-500 mb-3 hidden">If you are seeing this message it means the CTFGuide API is offline.</p>
        <p className="text-yellow-500 mb-3 hidden">This is a site wide broadcast. Hi!</p>

         <div className="bg-gradient-to-br from-gray-800 to-bg-gray-700 px-6 py-10 rounded-lg flex align-middle">

         <img className="rounded-full" src={user.imageUrl } alt="" /><h1 className="text-white text-4xl ml-4 mt-3">Hello Laphatize</h1>
           </div>
 
          <div className="mt-5 grid lg:grid-cols-3 gap-10 sm:grid-cols-1">


            <div className="lg:col-span-2 sm:col-span-1">
              <h1 className="text-4xl text-white mb-4 "> Continue working on</h1>
              
              <div id="fetchingHistory" className="mt-2 bg-gradient-to-t from-gray-800 to-black px-4 py-4 text-white rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl">Fetching History...</h1>
                    </div>


                  </div>
                </div>

                <div id="noHistory" className="hidden mt-2 bg-gradient-to-br from-gray-800 to-black-800  px-4 py-4 text-white rounded ">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text">☹️ Nothing here yet. Head on to the <span>Practice</span> page to get started.</h1>
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
              <div  className="mt-4 bg-gradient-to-br from-gray-800 to-black px-4 py-4 text-white rounded ">
                <h1 className="text-xl font-semibold text-yellow-500 inline-flex text-center"> <FireIcon className="h-6 w-6 text-center mr-1" aria-hidden="true" />  {userData.streak} day streak</h1>
                <p>No activity today, yet!</p>
              </div>
       
        
    
            
            
            </div>

            

          </div>


          <div>
     <h1 className="text-4xl text-white mt-6 mb-4"> Learning Path</h1>
     <div className="mt-2 bg-gradient-to-br from-gray-800 to-black px-4 py-4 text-white rounded ">
<div className="flex items-center justify-between">
  <h1 className="text-xl w-full"><i className="fas fa-search"></i> Exploratory Cybersecurity</h1>
  <div className="ml-2 flex-shrink-0 flex w-1/2">
  <div class="w-full bg-gray-800 rounded-full">
  <div class="bg-gradient-to-br from-green-600 to-green-900  text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: '25%'}}> 25%</div>
</div>

  </div>
                

  </div>
  
  <p class="mt-4 uppercase">Up next</p>
  <i className="far fa-play-circle"></i> Video Lesson - Cyberwhatnow?
</div>


<div className="mt-4 bg-gradient-to-br from-gray-800 to-black px-4 py-4 text-white rounded ">
<div className="flex items-center justify-between">
  <h1 className="text-xl"><i className="fab fa-linux"></i> Linux 101</h1>
  <div className="ml-2 flex-shrink-0 flex w-1/2">
  <div class="w-full bg-gray-800 rounded-full">
  <div class="bg-gradient-to-br from-green-600 to-green-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: '25%'}}> 25%</div>
</div>

  </div>
                

  </div>
  
  <p class="mt-4 uppercase">Up next</p>
  <i className="far fa-play-circle"></i> Video Lesson - Accessing other servers
</div>
</div>

              <div className="bg-gray-800 px-20 py-1 text-xl rounded-t-lg hover:bg-gray-700 hidden" style={{
                cursor: 'pointer',
                position: 'fixed',
                bottom: 0,
                right: '2%',   
              }}>
                <h1 className="text-white flex"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg> <span className="ml-2">Chat</span> <span className="bg-black text-white ml-4 rounded-lg px-3 text-md">7</span></h1>
            
              </div>

              <div className=" rounded-t-lg hover:bg-gray-700" style={{
                cursor: 'pointer',
                position: 'fixed',
                bottom: 0,
                right: '2%',   
              }}>
                <div className="bg-gray-800 px-20 py-1 text-xl">
                <h1 className="text-white flex"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg> <span className="ml-2">Chat</span> <span className="bg-black text-white ml-4 rounded-lg px-3 text-md">7</span></h1>
            </div>
        <div className="bg-gray-900 ">
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
      </main>

      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto " initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gradient-to-br from-gray-800 to-black text-white rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="sm:flex sm:items-start">
            
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-xl leading-6 font-semibold">
                  <i class="fas fa-door-open"></i> Onboarding
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className=" text-white">
                      Hi, Pranav. We're so excited to see you exploring the world of cybersecurity. But, we need to ask you a few questions to create an effective learning model for you.

                    
                    </p>

                    <button className="mt-4 px-6 py-2 border rounded-lg">Continue</button>  <button className="mt-4 px-6 py-2">No thanks!</button>
                  </div>
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