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
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        databaseURL: process.env.REACT_APP_databaseURL,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
        measurementId: process.env.REACT_APP_measurementId
    };


    const [value, setValue] = useState("This can be anything!");

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


    function saveChanges() {
        document.getElementById("loaderz").classList.remove("hidden")

        console.log(document.getElementsByClassName("CodeMirror")[0].innerText)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${process.env.REACT_APP_API_URL}/challenges/create-challenge`)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`uid=${auth.currentUser.uid}&difficulty=${document.getElementById("difficulty").value}&solution=${document.getElementById("solution").value}&category=${document.getElementById("category").value}&description=${encodeURI(document.getElementsByClassName("CodeMirror")[0].innerText)}&title=${document.getElementById("challengeName").innerText}&hint1=${document.getElementById("hint1").value}&hint2=${document.getElementById("hint2").value}&hint3=${document.getElementById("hint3").value}`)

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.alert("Saved. You'll recieve an email when your challenge is approved.");
                window.reload();
            }

            if (this.readyState == 4 && this.status != 200) {


                document.getElementById("loaderz").innerHTML = "Something went wrong. Your changes did not save. Please try saving again.\n" + this.responseText;
            }
        }
    }

    function saveDraft() {
        window.alert("Coming soon")
    }

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

                        <div id="home" className="">
                            <div className="flex items-center justify-between">

                                <h1 className="text-3xl text-white mb-4  ">Your Challenges</h1>
                                <div className="ml-2 flex-shrink-0 flex w-1/10">
                                    <button onClick={() => {
                                        document.getElementById("createChallenges").classList.remove("hidden");
                                        document.getElementById("home").classList.add("hidden");
                                    }} className="bg-green-900 border border-green-800 rounded-lg px-2 py-1 text-xl text-white">Create Challenge</button>
                                </div>
                            </div>
                            <div style={{ cursor: 'pointer' }} id="challBase" className="hidden bg-gray-900 border border-gray-700 rounded-lg text-white px-4 py-2 shadow-lg hover:shadow-gray-700/50 ">
                                <h1 className="text-xl">Challenge Name</h1>
                            </div>



                        </div>

                    </div>


                    {/* /End replace */}

                    <div id="createChallenges" className="hidden">
                        {/*/ Create a new challenge */}

                        <h1 id="challengeName" className="text-3xl text-white font-semibold" contentEditable>Untitled Challenge</h1>

                        <div className=" flex-shrink-0 flex">
                            <select
                                id="difficulty"
                                name="difficulty"
                                className="mt-1 mb-4  w-1/3 pl-3 pr-20  py-2 text-base border-gray-700 text-white bg-gray-900 focus:outline-none  sm:text-sm rounded-md"
                                defaultValue="easy">


                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>

                            <select
                                id="category"
                                name="category"
                                className="ml-4 mt-1 mb-4  w-1/3 pl-3 pr-20  py-2 text-base border-gray-700 text-white bg-gray-900 focus:outline-none  sm:text-sm rounded-md"
                                defaultValue="forensics">


                                <option value="forensics">forensics</option>
                                <option value="cryptography">cryptography</option>
                                <option value="web">web</option>
                                <option value="reverse engineering">reverse engineering</option>
                                <option value="programming">programming</option>
                                <option value="pwn">pwn</option>
                                <option value="steganography">steganography</option>
                                <option value="basic">basic</option>

                                <option value="other">other</option>


                            </select>
                        </div>


                        <div className="px-5 py-4 mt-5 rounded-lg  bg-gray-900 border border-gray-700">
                            <h3 className="mt-6  text-3xl leading-6 font-medium text-white mb-5"><i class="fas fa-align-left"></i> Challenge Content</h3>
                            <p className="text-gray-400"> You can use markdown!</p>
                            <SimpleMDE value={value} />
                        </div>


                        <div className="px-5 py-4 mt-5 rounded-lg  bg-gray-900 border border-gray-700">
                            <h3 className="mt-6 text-3xl leading-6 font-medium text-white mb-6"><i class="far fa-lightbulb"></i> Challenge Hints</h3>

                            <dt className="text-xl font-medium text-white truncate">Hint 1</dt>
                            <textarea id="hint1" className="mt-1 w-full rounded-lg border-gray-700 bg-black text-white">No hint set</textarea>

                            <dt className="mt-4 text-xl font-medium text-white truncate">Hint 2</dt>
                            <textarea id="hint2" className="mt-1 w-full rounded-lg border-gray-700 bg-black  text-white">No hint set</textarea>

                            <dt className="mt-4 text-xl font-medium text-white truncate">Hint 3</dt>
                            <textarea id="hint3" className="mt-1 w-full rounded-lg border-gray-700 bg-black text-white">No hint set</textarea>



                        </div>

                        <div className="px-5 py-4 mt-5 rounded-lg  bg-gray-900 border border-gray-700">
                            <h3 className="mt-6 text-3xl leading-6 font-medium text-white mb-6"><i class="far fa-flag"></i> Challenge Solution</h3>

                            <input id="solution" className="mb-4 mt-1 w-full px-2 py-2 border border-gray-600 rounded-lg border-gray-700 bg-black text-white"></input>



                        </div>

                        <div className="px-5 py-4 mt-5 rounded-lg  bg-gray-900 border border-gray-700">
                            <h1 className="text-3xl text-white"><i class="fab fa-docker"></i> Deploy a docker container <span class="text-xl bg-black px-5 rounded-lg">BETA</span></h1>
                            <p className="text-white mt-4"><b className="italic bold">This is not required!</b> Sometimes if you have a challenge that has a web component, you'd need to host it yourself. However, now you can just give us a docker container and we'll deploy it to our servers.</p>
                            <input className="mt-4 text-white" type="file"></input>


                        </div>

                        <button onClick={saveChanges} className="mr-2 mt-6 bg-green-700 border-green-600 hover:bg-green-800 px-4 py-2 text-2xl text-white rounded-lg"><i class="fas fa-send"></i> Send for approval</button>

                        <button onClick={saveDraft} className="hidden mr-2 mt-6 bg-blue-700 border-blue-600 hover:bg-blue-800 px-4 py-2 text-2xl text-white rounded-lg"><i class="fas fa-save"></i> Save as draft</button>

                    </div>

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