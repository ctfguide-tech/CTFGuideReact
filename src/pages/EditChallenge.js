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
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        databaseURL: process.env.REACT_APP_databaseURL,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
        measurementId: process.env.REACT_APP_measurementId
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
                        console.log(data)
                        document.getElementById("challengeName").innerHTML = data.title;
                        document.getElementById("challengeViews").innerHTML = data.views;
                        document.getElementById("challengeAttempts").innerHTML = data.attempts;
                        document.getElementById("challengeGoodAttempts").innerHTML = data.goodAttempts;
                     //   document.getElementById("challengeDetails").innerHTML = data.problem;
                     setValue(data.problem);
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

    function saveChanges() {
        document.getElementById("loaderz").classList.remove("hidden")
    
        console.log(document.getElementsByClassName("CodeMirror")[0].innerText)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${process.env.REACT_APP_API_URL}/challenges/update/${window.location.href.split("/")[4]}`)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`uid=${auth.currentUser.uid}&problem=${encodeURI(document.getElementsByClassName("CodeMirror")[0].innerText)}&title=${document.getElementById("challengeName").innerText}&hint1=${document.getElementById("hint1").value}&hint2=${document.getElementById("hint2").value}&hint3=${document.getElementById("hint3").value}`)
    
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var serverResponse = JSON.parse(this.responseText);
                if (serverResponse) {
                    if (serverResponse.message == "OK") {
                        document.getElementById("saved").classList.remove("hidden")
                        document.getElementById("loaderz").classList.add("hidden")
                    } else {
                    
                        document.getElementById("loaderz").innerHTML = "Something went wrong. Your changes did not save. Please try saving again."
                    }
                } else {
                    
                    document.getElementById("loaderz").innerHTML = "Something went wrong. Your changes did not save. Please try saving again."
                }
            }

            if (this.readyState == 4 && this.status != 200) {
             
                    
                    document.getElementById("loaderz").innerHTML = "Something went wrong. Your changes did not save. Please try saving again.\n" + this.responseText;
                }
        }
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
                                <p id="loaderz" className="hidden text-white mb-4"><i class="fas fa-spinner text-white  fa-spin"></i> One moment please</p>
                    <div>

                         

                        <div className="px-5 py-10 rounded-lg  bg-gray-900 border border-gray-700">
                            <div>

                                <div>

                                <div class="flex items-center justify-between">
                                <h3 className="text-4xl leading-6 font-semibold text-white"><span id="challengeName" className="bg-black px-3" contenteditable="true">   </span> <span className="hidden ml-3 bg-yellow-800 text-yellow-200 text-sm rounded-full px-2 py-1">• PENDING REVIEW</span>  <span className="hidden bg-blue-800 text-blue-200 text-sm rounded-full px-2 py-1">• DRAFT</span> </h3>
                            
                            
                            <div class="ml-2 flex-shrink-0 flex">
                            
                                  

                              
                            <button onClick={saveChanges} className="mr-2 bg-green-700 border-green-600 hover:bg-green-800 px-3 py-1 text-white rounded-lg"><i class="fas fa-save"></i> Save Changes</button>
                            <button className="hidden bg-red-700 border-red-600 hover:bg-red-800 px-3 py-1 text-white rounded-lg"><i class="fas fa-trash"></i> Delete Challenge</button>

                            </div>
                          </div>



                            
               

                            
                               <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                        <div className="px-4 py-5 bg-black border  border-gray-700 rounded-lg overflow-hidden sm:p-6">
                                            <dt className="text-sm font-medium text-white truncate">Challenge Views</dt>
                                            <dd id="challengeViews" className="mt-1 text-3xl font-semibold text-white">--</dd>
                                        </div>

                                        <div className="px-4 py-5 bg-black border  border-gray-700 rounded-lg overflow-hidden sm:p-6">
                                            <dt className="text-sm font-medium text-white truncate">Challenge Attempts</dt>
                                            <dd id="challengeAttempts" className="mt-1 text-3xl font-semibold text-white">--</dd>
                                        </div>


                                        <div className="px-4 py-5 bg-black border  border-gray-700 rounded-lg overflow-hidden sm:p-6">
                                            <dt className="text-sm font-medium text-white truncate">Successful Attempts</dt>
                                            <dd id="challengeGoodAttempts" className="mt-1 text-3xl font-semibold text-white">--</dd>
                                        </div>

                                    </dl>
                                </div>
                    
                            </div>

                  
                     
                     </div>
                     <div className="px-5 py-4 mt-5 rounded-lg  bg-gray-900 border border-gray-700">
                     <h3 className="mt-6  text-3xl leading-6 font-medium text-white mb-5">Challenge Content</h3>
                            <p className="text-gray-400"> You can use markdown!</p>
            <SimpleMDE  value={value} />
            </div>


            <div className="px-5 py-4 mt-5 rounded-lg  bg-gray-900 border border-gray-700">
                            <h3 className="mt-6 text-3xl leading-6 font-medium text-white mb-6">Challenge Hints</h3>

                                            <dt className="text-xl font-medium text-white truncate">Hint 1</dt>
                                            <textarea id="hint1" className="mt-1 w-full rounded-lg border-gray-700 bg-black text-white">No hint set</textarea>

                                            <dt className="mt-4 text-xl font-medium text-white truncate">Hint 2</dt>
                                            <textarea id="hint2" className="mt-1 w-full rounded-lg border-gray-700 bg-black  text-white">No hint set</textarea>

                                            <dt className="mt-4 text-xl font-medium text-white truncate">Hint 3</dt>
                                            <textarea id="hint3" className="mt-1 w-full rounded-lg border-gray-700 bg-black text-white">No hint set</textarea>
                                 


                        </div>




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


export default EditChallenge;