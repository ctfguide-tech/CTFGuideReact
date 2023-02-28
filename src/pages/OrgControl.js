import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { io } from "socket.io-client";
import DashboardManager from "../modules/DashboardManager.js"
import 'animate.css';
import { Navigation } from '../components/navigation';


const OrgControl = () => {
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

    const [Learn, setLearn] = useState({
        data: []
    })

    const auth = getAuth();
    //const socket = io("http://localhost:3002");


    const [open, setOpen] = useState(true)
    const [show, setShow] = useState(false)
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


    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    function changePassword() {
        var password = document.getElementById("confirmnewpass").value;
        if (password != document.getElementById("newpass").value) {
            document.getElementById("error").classList.remove("hidden");
            document.getElementById("error").innerText("Passwords must match!")
            document.getElementById("newpass").classList.remove("border-gray-600")
            document.getElementById("newpass").classList.add("border-red-600")
            document.getElementById("confirmnewpass").classList.remove("border-gray-600")
            document.getElementById("confirmnewpass").classList.add("border-red-600")

            return;
        } else {
            updatePassword(auth.currentUser, password).then(() => {
                // notify our server
                var xhttp = new XMLHttpRequest()
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        setShow(true);
                    }
                }
                
                xhttp.open("POST", `${process.env.REACT_APP_API_URL}/users/alerts?type=password_change&uid=${localStorage.getItem("token")}`)
                xhttp.send();
            }).catch((error) => {
                document.getElementById("error").classList.remove("hidden");
                document.getElementById("error").innerText(error)
                document.getElementById("newpass").classList.remove("border-gray-600")
                document.getElementById("newpass").classList.add("border-red-600")
                document.getElementById("confirmnewpass").classList.remove("border-gray-600")
                document.getElementById("confirmnewpass").classList.add("border-red-600")

            })
        }

        




        
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
                if (firebaseUser.email == "shashivadlamudi@drexel.edu") {
                  document.getElementById("probox").classList.remove("hidden");
                }
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
                        document.getElementById("usernamechange").value = data.username;

                     
                        
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



    function saveChanges() {
      var bio = document.getElementById("bio").value;
      var username = document.getElementById("username").value;
      if (bio.length > 100) return window.alert("Biography is too long.")
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 & this.status === 200) {
          window.location.reload();
        }
      }
      xhttp.open("POST", `${process.env.REACT_APP_API_URL}/users/set-bio?uid=${localStorage.getItem("token")}&bio=${bio}`);
      xhttp.send();

    }


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

        <div className="min-h-full " style={{ fontFamily: 'Poppins, sans-serif' }}>

        <Navigation/>


            <main className="mt-3" >
  <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 border border-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-white">Successfully saved!</p>
                    <p className="mt-1 text-sm text-gray-200">Certain changes may take a few minutes to sync with our cache system.</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8   ">

              
                <div id="billing_error" className="rounded-lg bg-gray-900 px-3 py-2 w-2/3">

<h1 className="text-xl bg-gray-900  text-white ">Your organization isn't activated yet. <button className="float-right bg-gray-800 rounded-lg text-white px-3">Finish Activation</button></h1>


</div>
                    <p className={"mt-4 text-white  text-4xl font-semibold"}> Pennsylvania State University</p>
                    <div className="flex flex-wrap -mx-2 mt-4 gap-y-4">
                            <Link to={"./manage-members"} className="w-full md:w-1/2 px-2 ">
                                <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 hover:bg-gray-800">
                                    <div className="flex items-center justify-between">

                                        <div className="mx-auto text-center">
                                            <i className="fas text-white text-5xl fa-users-cog"></i>
                                            <br></br>
                                            <p className="text-white font-bold text-xl mb-2 mt-4">Manage Members</p>
                                            <p className="text-white">Easily manage users in your organization.</p>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="w-full md:w-1/2 px-2">
                                <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 hover:bg-gray-800">
                                    <div className="flex items-center justify-between">

                                        <div className="mx-auto text-center">
                                            <i className="fas fa-file-invoice-dollar text-5xl text-white"></i>
                                            <br></br>
                                            <p className="text-white font-bold text-xl mb-2 mt-4">Billing Settings</p>
                                            <p className="text-white">Handle anything billing related for your organization..</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 px-2">
                                <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 hover:bg-gray-800">
                                    <div className="flex items-center justify-between">

                                        <div className="mx-auto text-center">
                                        <i class="fas fa-headset text-5xl text-white"></i>
                                            <br></br>
                                            <p className="text-white font-bold text-xl mb-2 mt-4">Support</p>
                                            <p className="text-white">Stuck on something? Create a support ticket our browse our FAQ's.</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                 

     <div className="" >


    

  

    </div>


                </div>

                
            </main>

        
        </div>


    )


}




export default OrgControl;