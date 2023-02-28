import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { io } from "socket.io-client";
import DashboardManager from "../modules/DashboardManager.js"
import 'animate.css';
import { Navigation } from '../components/navigation';


const OrgControlManage = () => {
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

    const [people, setPeople] = useState([
        { name: 'Pranav Ramesh',  email: 'pkr53@%psu.edu', role: 'Teacher' },
        { name: 'Pranav Ramesh',  email: 'pkr53@%psu.edu', role: 'Teacher' },

        // More people...
      ])

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
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 border border-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
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

              
    
                
<div className="px-4 sm:px-6 lg:px-8 text-white">
      <div className="sm:flex sm:items-center">

     
        <div className="sm:flex-auto">
       
          <h1 className="text-3xl font-semibold text-white"><i class="fas fa-users"></i> Members - <span className="
                   text-xl ">Pennsylvania State University</span></h1>
          <p className="mt-2 text-sm  text-white">
            A list of all the users in your organization including their name, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700  sm:w-auto"
          >
           <i class="far fa-copy mr-2"></i> Copy Invite Link
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col ">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-600 bg-black">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Account Type
                    </th>
                    
                  
                    <th scope="col" className="hidden relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {people.map((person, personIdx) => (
                    
                    <tr key={person.email} className={personIdx % 2 === 0 ? undefined : 'bg-gray-800'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{person.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white"><select id={personIdx} onChange={e => {

                            people[personIdx].role = e.target.value;
                            setPeople(people);
                            setShow(true);
                            setInterval(() => {
                                setShow(false);
                                }
                                , 3000);
                        
                       

                      }} value={person.role} className="px-10 py-1 bg-gray-900 border-gray-800 text-sm" ><option value="Normal Account">Normal Account</option><option value="Teacher">Teacher</option><option value="Admin">Admin</option></select></td>
                      <td className="hidden relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  
                  
                </tbody>
              </table>
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




export default OrgControlManage;