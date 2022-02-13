import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition , Dialog} from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Practice = () => {
  const [open, setOpen] = useState(false)

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

  document.title = "CTFGuide - Activity"
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    imageUrl: 'https://ctfguide.com/demopfp.png'
  });

  const [challenge, setChallenges] = useState({
    data: []
  })

  const [userData, setUserData] = useState({
    points: 0,
    susername: 'Loading...',
    spassword: 'Loading...',
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
        xhttp.onreadystatechange = function () {

          if (this.readyState === 4 & this.status === 200) {
            let data = JSON.parse(this.responseText);
            setUserData({
              points: data.points,
              susername: data.username,
              spassword: data.vmPassword,
            })

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

        // ChallengeName ChallengeDetails
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            // Success!
            let data = JSON.parse(this.responseText);
            document.getElementById("challengeName").innerHTML = data.title;
            document.getElementById("challengeDetails").innerHTML = data.problem;

            document.getElementById("suggestedLoader").classList.add("hidden");
          }
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/specific/` + window.location.href.split("/")[4]);
        xhttp.send();




      } else {
        window.location.href = "../login";
      }
    });
  }, []);


  function submitFlag() {

    document.getElementById("enterFlagBTN").innerHTML = "Checking flag...";

    var challengeID = window.location.href.split("/")[4];
    var flag = document.getElementById("enteredFlag").value;
    if (!flag) {
      document.getElementById("enteredFlag").classList.add("border-red-600");
      document.getElementById("enterFlagBTN").innerHTML = "Submit Flag";
      
      setTimeout(function() {
        document.getElementById("enteredFlag").classList.remove("border-red-600");
      }, 2000)
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var serverResponse = JSON.parse(this.responseText);
        if (serverResponse) {
          if (serverResponse.response == "OK") {
            document.getElementById("success").classList.remove("hidden");
          } else {
            document.getElementById("enteredFlag").classList.add("border-red-600");
            document.getElementById("enterFlagBTN").innerHTML = "Submit Flag";

            setTimeout(function() {
              document.getElementById("enteredFlag").classList.remove("border-red-600");
              
            }, 2000)
          }
        }
      }
    }
    xhttp.open("GET", `http://localhost:3001/challenges/check/${challengeID}?uid=${auth.currentUser.uid}&flag=${flag}`);
    xhttp.send();
  }

  function showTerminal() {
    document.getElementById("terminal").classList.remove("hidden");
  }
  const navigation = [
    { name: 'Dashboard', href: '../dashboard', current: false },
    { name: 'Practice', href: '../practice', current: false },
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

    <div className="min-h-full example" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
    <Disclosure as="nav" className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 ">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-14 w-14"
                      src="../CTFGuide trans dark.png"
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
              
                  <p className="text-yellow-500 hover:text-yellow-400" style={{cursor:'pointer'}}>✨ Upgrade to pro</p>
                    <button
                      type="button"
                      className="ml-3 bg-gray-900 border border-gray-700 px-3 font-semibold rounded-full text-blue-500  focus:outline-none "
                    >
                      <span className="sr-only">View notifications</span>
                      {userData.points} points
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-900 border border-gray-700 text-white focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  style={{cursor:'pointer'}}
                                  className={classNames(
                                    active ? 'bg-gray-800' : '',
                                    'block px-4 py-2 text-sm text-gray-200'
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
               
                 
                </div>
                <div className="mt-3 px-2 mx-auto text-center">
                <p className="text-yellow-500 hover:text-yellow-400 mb-2" style={{cursor:'pointer'}}>✨ Upgrade to pro</p>
                    <button
                      type="button"
                      className="ml-3  bg-gray-900 border border-gray-700 px-3 font-semibold rounded-full text-blue-500  focus:outline-none "
                    >
                     
                      {userData.points} points
                    </button>
                    </div>

                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name + "m"}
                      onClick={logout}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700"
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

          <div>



            <div className="px-5 py-10 rounded-lg  bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <h1 id="challengeName" className="text-4xl text-white mb-4 font-semibold"></h1>

              <div id="suggestedLoader" className="mt-2 px-4 py-4 ">
                <div className="flex items-center justify-between">



                  <div>
                    <h1 className="text-xl">One second please...</h1>
                  </div>


                </div>
              </div>
              

                  <p id="challengeDetails" className="text-white text-xl">
                      
                    </p>

                      <input id="enteredFlag" placeholder="CTFGuide{flag}" className="text-white  focus-outline-none  outline-none px-4 py-1 rounded-lg mr-2 bg-black border border-gray-700"></input>
                      <button id="enterFlagBTN" onClick={submitFlag} className="mt-4 border bg-black border-green-500  rounded-lg  hover:bg-gray-900 text-green-500 px-4 py-1">Submit Flag</button>
                      <button onClick={() => setOpen(true)} className="mt-4 border bg-black  rounded-lg  border-yellow-300 text-yellow-300 hover:bg-gray-900 text-white px-4 py-1 ml-2">Stuck?</button>
                      
                    <div id="terminal" className=" mt-6 ">
                  <p className="text-gray-400 mb-2 hint">Login as <span className="text-yellow-400">{userData.susername}</span> using the password <span className="text-yellow-400">{userData.spassword}</span><a style={{ cursor: 'pointer'}} className="hidden hover:bg-black text-gray-300">Need help?</a></p>
                    <iframe className="w-full" height="500" src="https://terminal.ctfguide.com/wetty/ssh/root?pass=" ></iframe>
                       </div>


            </div>

            <div className="mt-5   bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-5 py-10">
                    <h1 className="text-white text-4xl font-semibold">Comments</h1>
                    <textarea className="mt-4 text-white focus:outline-none outline-none block w-full bg-black rounded-lg"></textarea>
                    <button className="mt-4 border bg-black hover:bg-gray-900 rounded-lg text-white px-4 py-1">Post Comment</button>

              </div>


              
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
                    <Dialog.Title className="text-lg font-medium text-white text-2xl">Challenge Hint</Dialog.Title>
                    <div class="bg-gray-800 rounded-lg px-4 py-2 mt-4">


                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-white  uppercase">Hint 1</p>
                        
                        </div>
                        <div class="ml-2 flex-shrink-0 flex w-1/10">
                          <button class="border text-white border-green-500 px-4 py-1 rounded-lg hover:bg-gray-900">Unlock Hint</button>
                          </div>
                          </div>
                  
                  
                  
                  
                    </div>

                    <div class="bg-gray-800 rounded-lg px-4 py-2 mt-4">


<div class="flex items-center justify-between">
  <div>
    <p class="text-white  uppercase">Hint 2</p>
    
    </div>
    <div class="ml-2 flex-shrink-0 flex w-1/10">
      <button class="border text-white border-green-500 px-4 py-1 rounded-lg hover:bg-gray-900">Unlock Hint</button>
      </div>
      </div>




</div>

<div class="bg-gray-800 rounded-lg px-4 py-2 mt-4">


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
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="h-full " aria-hidden="true" />
                    </div>
                    {/* /End replace */}
               
               
                    <div className="text-white">
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



          
          {/* /End replace */}
        </div>
      </main>

      <p className="mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>


    </div>

  )
}


export default Practice;