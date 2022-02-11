import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Practice = () => {

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

  document.title = "CTFGuide - Practice"
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    imageUrl: 'https://ctfguide.com/demopfp.png'
  });

  const [challenge, setChallenges] = useState({
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


          }

          if (this.readyState === 4 & this.status === 500) {
            // User not registered via API
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
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

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            // Success!
            console.log(JSON.parse(this.responseText));
            setChallenges({
              data: JSON.parse(this.responseText)
            })
            document.getElementById("suggestedLoader").classList.add("hidden");
          }
        }
        xhttp.open("GET", "http://localhost:3001/challenges/all");
        xhttp.send();




      } else {
        window.location.href = "../login";
      }
    });
  }, []);
  const navigation = [
    { name: 'Dashboard', href: './dashboard', current: false },
    { name: 'Practice', href: './practice', current: true },
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

  function practiceTutorialDone() {
    
      localStorage.setItem("practiceTutorial", "true");
    localStorage.setItem("tutorial_phase", "3");

    window.location.href = "../challenges/2Hr3KHnaqUW6YFrvjwuc"
  }

  window.onload = function () {
    if (localStorage.getItem("tutorial_phase") == 1) {
      document.getElementById("practice_tutorial").classList.remove("hidden");
  
    }
  
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


      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

          <div>



            <div className="">
              <h1 className="text-4xl text-white mb-4">Suggested for you</h1>

              <div id="suggestedLoader" className="mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-blue-900">
                <div className="flex items-center justify-between">



                  <div>
                    <h1 className="text-xl">One second please...</h1>
                  </div>


                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-2">
                {

                  challenge.data.map((item) => (


                    <div
                    onClick={() => {window.location.href = `./challenges/${item.id}`}}
                     style={{cursor: 'pointer'}}
                      key={item.title}
                      className="px-3 py-2  rounded-md bg-gradient-to-br from-gray-900 to-black border border-gray-800  mb-2  text-base font-medium text-white hover:text-white "
                    ><span className="font-semibold">{item.title} </span>
                  <br></br>
                      <span className={"lowercase " +  (item.difficulty === 'hard' ? 'text-red-500' : item.difficulty === 'medium' ? ' text-yellow-500' : 'text-green-500')}> {item.difficulty}</span> <b>∙</b><span className="bg-black rounded-lg px-2  lowercase">{item.category}</span>
                  
                    </div>

                  ))


                }
              </div>


            </div>


            <hr class="mt-10 ml-4 mr-4 mb-4 border-gray-700 hidden" />
            <div className="mt-6 hidden">
              <h1 className="text-4xl text-white mb-4">Challenges by category</h1>

              <div className="mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-blue-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl">One second please...</h1>
                  </div>


                </div>
              </div>




            </div>

          </div>


          <div className="hidden px-4 py-4 sm:px-0">
            <div className=" rounded-lg h-96" />



          </div>
          {/* /End replace */}


          <p className="mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>



          <div id="practice_tutorial" className="hidden fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
   
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity" aria-hidden="true"></div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

 
    <div className="inline-block align-bottom shadow-lg shadow-blue-900/50 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
      <div>
    
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-4xl leading-6 font-semibold text-white" id="modal-title">Practice</h3>
          <div className="mt-4">
            <p className="text-xl px-5 text-white">CTFGuide has 100s of community uploaded challenges for you to use for <b>FREE</b>. There are three difficultes and various categories.</p>
            <iframe className="mt-4 w-full px-5 mt-4 h-80" src="https://www.youtube-nocookie.com/embed/QU952BUA9Gk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; hide-info;"></iframe>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 mx-auto text-center">
        <button onClick={practiceTutorialDone} type="button" className="hover:bg-gray-800 mt-3 w-1/2 text-xl inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-white text-base font-medium sm:mt-0 sm:col-start-1 ">Continue</button>
      </div>
    </div>
  </div>
</div>
        </div>


        
      </main>
    </div>

  )
}


export default Practice;