import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
      } else {
        window.location.href = "../login";
      }
    });
  }, []);
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
      <Disclosure as="nav" className="bg-black">
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


      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">



            <div className="lg:col-span-2 sm:col-span-1">
              <h1 className="text-4xl text-white mb-4"> Continue working on</h1>
              
              <div id="fetchingHistory" className="mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-blue-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl">Fetching History...</h1>
                    </div>


                  </div>
                </div>

                <div id="noHistory" className="hidden mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-red-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl">No history found!</h1>
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

     <h1 className="text-4xl text-white mt-6 mb-4"> Suggested for you</h1>

                <div className="bg-gray-900 px-5 py-3 border border-blue-800 rounded">
                  <div className="grid lg:grid-cols-5">
                    <div>
                    <img width="100" src="./cybersec1.png"/>
                    </div>
                    <div className="col-span-4 py-3">
                    <h1 className="text-white text-xl">What is Cybersecurity?</h1>
                    <p className="text-white">In this lesson, we'll learn about what cybersecurity is and it's many applications in our world.</p>
                    </div>
                  </div>
                
                  
                </div>
      

                <h1 className="text-4xl text-white mt-6 mb-4"> Developer Message</h1>
                <p className="text-white">Hey, did we load your stuff properly? We just did a database migration and we want to confirm that this looks normal with you.</p>
                <p className="text-green-500 bg-gray-900 mt-4 px-4 py-2" id="myInfo"></p>
            </div>


            <div className="">
              <h1 className="text-4xl text-white mb-4"> Progress</h1>
              <div className="bg-gray-900 px-4 py-4 text-white mx-auto text-center mt-2 rounded border border-blue-900">
                <h1 className="text-xl font-semibold text-yellow-500 inline-flex text-center"> <FireIcon className="h-6 w-6 text-center mr-1" aria-hidden="true" />  {userData.streak} day streak</h1>
                <p>No activity today, yet!</p>
              </div>
              <div className="bg-gray-900 px-4 py-4 text-white mx-auto text-center mt-2 rounded border border-blue-900">
                <h1 className="text-xl font-semibold text-blue-500 inline-flex text-center">Gold League</h1>
                <p>Season 2 | Competitive</p>
              </div>
            
              <h1 className="text-4xl text-white mt-6 mb-4"> Social</h1>
              <div>
      <ul role="list" className="">
      
          <li  className="py-4 bg-gray-900 border border-blue-800 px-4 mb-2 rounded">
            <div className="flex space-x-3">
              <img className="h-6 w-6 rounded-full" src="https://th.bing.com/th/id/R.2f86c5260be65f26800c2f88cc39aa6b?rik=t8ZDT5ZTeX5wpA&riu=http%3a%2f%2fwww.trbimg.com%2fimg-5a68a878%2fturbine%2fct-grumpy-cat-lawsuit-20180124&ehk=Tjg%2fsr1Mwd0lIKKGL5eCh0b6O4s2DSGvi7Gvsw8DVto%3d&risl=&pid=ImgRaw&r=0" alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">valmodaa1 has logged in</h3>
                  <p className="text-sm text-blue-500">just now</p>
                </div>
                <p className="text-sm text-blue-500">
                  
                </p>
              </div>
            </div>
          </li>
          <li  className="py-4 bg-gray-900 border border-blue-800 px-4 mb-2 rounded">
            <div className="flex space-x-3">
              <img className="h-6 w-6 rounded-full" src="https://th.bing.com/th/id/R.2f86c5260be65f26800c2f88cc39aa6b?rik=t8ZDT5ZTeX5wpA&riu=http%3a%2f%2fwww.trbimg.com%2fimg-5a68a878%2fturbine%2fct-grumpy-cat-lawsuit-20180124&ehk=Tjg%2fsr1Mwd0lIKKGL5eCh0b6O4s2DSGvi7Gvsw8DVto%3d&risl=&pid=ImgRaw&r=0" alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">valmodaa1</h3>
                  <p className="text-sm text-blue-500">just now</p>
                </div>
                <p className="text-sm text-white">
                  Solved Horrible Web Authentication
                </p>
              </div>
            </div>
          </li>
        
      </ul>
    </div>
            
            
            </div>

            
          </div>


          <div className="px-4 py-4 sm:px-0">
            <div className=" rounded-lg h-96" />



          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>

  )
}


export default Dashboard;