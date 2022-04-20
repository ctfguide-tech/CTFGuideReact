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

const Create = () => {
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
    const [value, setValue] = useState("Loading...");

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

                        if (data.createdChallenges) {
                            data.createdChallenges.forEach(challenge => {
                               loadchallenge(challenge)
                            });

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
        


            } else {
                window.location.href = "../login";
            }
        });
    }, []);


function loadchallenge(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            let data = JSON.parse(this.responseText);

            document.getElementById("challBase").insertAdjacentHTML('afterend', `<div onclick="window.location.href = '../challenges/${id}/edit'" class="mt-2 bg-gray-900 border border-gray-700 rounded-lg text-white px-4 py-2 shadow-lg hover:shadow-gray-700/50 " style="cursor: pointer;"><h1 class="text-xl">${data.title}</h1></div>`);

            //    window.alert(JSON.stringify(data.comments))
            // document.getElementById("suggestedLoader").classList.add("hidden");
        }
    }
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/specific/` + id);
    xhttp.send();


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

                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">
                                <p id="loaderz" className="hidden text-white mb-4"><i class="fas fa-spinner text-white  fa-spin"></i> One moment please</p>
                    <div>
            
                    <h1 className="text-4xl text-white mb-4  ">Creator Dashboard</h1>

                    <h1  className="text-3xl text-white mb-4  ">Your Challenges</h1>     
                        <div style={{cursor: 'pointer'}} id="challBase" className="hidden bg-gray-900 border border-gray-700 rounded-lg text-white px-4 py-2 shadow-lg hover:shadow-gray-700/50 ">
                            <h1 className="text-xl">Challenge Name</h1>
                        </div>
                    <hr className="border-gray-700 mt-6"></hr>

                    <h1  className="text-3xl text-white mt-4 mb-2">Your Lessons</h1>     
                    <p className="text-white mb-5 ">
             
                  Your account is unable to make lessons at this time.
                        </p>

        <hr className="border-gray-700"></hr>
                    <h1  className="text-3xl text-white mb-2 mt-4">Revenue Earned</h1>     
                    <p className="text-white ">
                    <b>Profits this month:</b> $0.00<br></br>
                    <b>Profits to date:</b> $0.00<br></br>
        <br></br>
                    You can earn money based on how many people with CTFGuide PRO complete your lessons.
                        </p>

                        <button className="mt-3 border border-gray-700 hover:Brounded-lg px-2 py-1 text-white bg-gray-900 rounded-lg">Cashout via Stripe</button>     <button className="mt-3 border border-gray-700 rounded-lg px-2 py-1 text-white bg-gray-900 ">Cashout via Paypal</button>

                    </div>




                    {/* /End replace */}



                    <div id="saved" aria-live="assertive" className="hidden fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
  <div className="w-full flex flex-col items-center space-y-4 sm:items-end">

    <div className="max-w-sm w-full bg-gray-900 border border-gray-700 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">

            <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-white">All changes saved</p>
            <p className="mt-1 text-sm text-gray-300">It may take a few minutes for your changes to be visible.</p>
          </div>
     
        </div>
      </div>
    </div>
  </div>
</div>
                </div>
            </main>

       
    <p className="mt-4 text-gray-500 py-6 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/terms-of-service.md">Terms of Service</a> • <a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/privacy-policy.md">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

  
        </div>

    )
}


export default Create;