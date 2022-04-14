import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, StarIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Navigation } from "../components/navigation";
import { SuccessModal } from "../components/successModal";
import 'animate.css';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const EditChallenge = () => {
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
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

    document.title = "CTFGuide - Edit Challenge";
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


                        if (data.solvedChallenges.includes(window.location.href.split("/")[4])) {
                            document.getElementById("solvedChallenge").classList.remove("hidden");
                        }

                        document.getElementById("navPoints").innerHTML = data.points
                        setUserData({
                            points: data.points,
                            susername: data.vmUsername,
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

                        //    window.alert(JSON.stringify(data.comments))
                        document.getElementById("suggestedLoader").classList.add("hidden");
                    }
                }
                xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/specific/` + window.location.href.split("/")[4] + `?uid=${firebaseUser.uid}`);
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

            setTimeout(function () {
                document.getElementById("enteredFlag").classList.remove("border-red-600");
            }, 2000)
        }


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var serverResponse = JSON.parse(this.responseText);
                if (serverResponse) {
                    console.log(serverResponse.message)
                    if (serverResponse.message == "OK") {

                        localStorage.setItem("award", serverResponse.award);

                        // document.getElementById("success").classList.remove("hidden");
                        document.getElementById("enteredFlag").classList.add("border-green-600");
                        document.getElementById("enterFlagBTN").innerHTML = "Submit Flag";

                        setOpen2(true);

                        setTimeout(function () {
                            document.getElementById("enteredFlag").classList.remove("border-green-600");

                        }, 2000)
                    } else {
                        document.getElementById("enteredFlag").classList.add("border-red-600");
                        document.getElementById("enterFlagBTN").innerHTML = "Submit Flag";

                        setTimeout(function () {
                            document.getElementById("enteredFlag").classList.remove("border-red-600");

                        }, 2000)
                    }
                }
            }
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/check/${window.location.href.split("/")[4]}?uid=${auth.currentUser.uid}&flag=${flag}`);
        xhttp.send();
    }

    for (var i = 0; i < document.getElementsByClassName("separator").length; i++) {
        document.getElementsByClassName("separator")[i].style.display = "none";
    }

    function showTerminal() {
        document.getElementById("terminal").classList.remove("hidden");
    }
    const navigation = [
        { name: 'Dashboard', href: '../dashboard', current: false },
        { name: 'EditChallenge', href: '../EditChallenge', current: false },
        { name: 'Learn', href: '../learn', current: false },
        { name: 'Classes', href: '#', current: false },
        { name: 'CTFLive', href: '#', current: false },
        { name: 'Leaderboards', href: '../leaderboards/global', current: false },
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
            <Navigation />


            <main>
                <div id="message" className="hidden relative bg-blue-900">
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
                                    document.getElementById("message").classList.add("hidden")
                                }
                                }
                            >
                                <span className="sr-only">Dismiss</span>
                                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">

                    <div>

                         

                        <div className="px-5 py-10 rounded-lg  bg-gray-900 border border-gray-700">
                            <div>

                                <div>

                                <div class="flex items-center justify-between">
                                <h3 className="text-4xl leading-6 font-semibold text-white">Challenge Name   <span className="bg-yellow-800 text-yellow-200 text-sm rounded-full px-2 py-1">• PENDING REVIEW</span>  <span className="bg-blue-800 text-blue-200 text-sm rounded-full px-2 py-1">• DRAFT</span> </h3>
                            
                            
                            <div class="ml-2 flex-shrink-0 flex">
                            
                                  

                              
                            <button className="mr-2 bg-green-700 border-green-600 hover:bg-green-800 px-3 py-1 text-white rounded-lg"><i class="fas fa-plus-circle"></i> Invite Collaborator</button>
                            <button className="bg-red-700 border-red-600 hover:bg-red-800 px-3 py-1 text-white rounded-lg"><i class="fas fa-trash"></i> Delete Challenge</button>

                            </div>
                          </div>



                            
               

                                    <h3 className="mt-12 text-3xl leading-6 font-medium text-white">Challenge Statistics</h3>

                               <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                        <div className="px-4 py-5 bg-gray-900 border  border-gray-700 rounded-lg overflow-hidden sm:p-6">
                                            <dt className="text-sm font-medium text-white truncate">Challenge Views</dt>
                                            <dd className="mt-1 text-3xl font-semibold text-white">--</dd>
                                        </div>

                                        <div className="px-4 py-5 bg-gray-900 border  border-gray-700 rounded-lg overflow-hidden sm:p-6">
                                            <dt className="text-sm font-medium text-white truncate">Challenge Attempts</dt>
                                            <dd className="mt-1 text-3xl font-semibold text-white">--</dd>
                                        </div>


                                        <div className="px-4 py-5 bg-gray-900 border  border-gray-700 rounded-lg overflow-hidden sm:p-6">
                                            <dt className="text-sm font-medium text-white truncate">Successful Attempts</dt>
                                            <dd className="mt-1 text-3xl font-semibold text-white">--</dd>
                                        </div>

                                    </dl>
                                </div>
                    
                            </div>

                               <br></br>
                               <h3 className="mt-6 text-3xl leading-6 font-medium text-white mb-2">Challenge Content</h3>

                            <SimpleMDE />



                        </div>




                    </div>




                    {/* /End replace */}
                </div>
            </main>

            <p className="mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

        </div>

    )
}


export default EditChallenge;