import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, ExclamationIcon, CheckIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/outline'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { io } from "socket.io-client";
import DashboardManager from "../../modules/DashboardManager.js"
import 'animate.css';
import { Navigation } from '../../components/navigation';
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import YoutubePlayer from "react-youtube"
const Ch1_2 = () => {
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
  //const socket = io("http://localhost:3002");


  const [open, setOpen] = useState(true)
  const [show, setShow] = useState(true)
  const cancelButtonRef = useRef(null)
  document.title = "CTFGuide - Learn"
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



  
  const [Learn, setLearn] = useState({
    data: []
  })


  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
  var player;



  useEffect(() => {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
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
            document.getElementById("navPoints").innerHTML = data.points;

            if (data.lessonsCompleted) {
                if (data.lessonsCompleted.includes("c1a1")) {
                    document.getElementById("nextstep").innerHTML = "Onward!"
                    localStorage.setItem("cdone", true)
                }
                
            }

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


  const steps = [
    { id: '', name: 'What Is Cybersecurity?', href: '/learn/chapter1/lesson1', status: 'learning' },
    { id: '', name: 'Review Activity', href: '/learn/chapter1/activity1', status: 'inprogress_a' },
    { id: '', name: 'Staying Safe Online', href: '/learn/chapter1/lesson2', status: 'learning' },
  ]

  const navigation = [
    { name: 'Dashboard', href: '../dashboard', current: false },
    { name: 'Practice', href: '../practice', current: false },
    { name: 'Learn', href: './learn', current: true },
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

var problemSet = 0;
var currentlySelected = "nothing";
var score = 0;
function selectA(arg1) {
    currentlySelected = arg1

    if (arg1 == "a") {
        document.getElementById("b").classList.remove("border-blue-500");
        document.getElementById("c").classList.remove("border-blue-500");
        document.getElementById("d").classList.remove("border-blue-500");
        document.getElementById(currentlySelected).classList.add("border-blue-500")
    } else if (arg1 == "b") {
        document.getElementById("a").classList.remove("border-blue-500");
        document.getElementById("c").classList.remove("border-blue-500");
        document.getElementById("d").classList.remove("border-blue-500");
        document.getElementById(currentlySelected).classList.add("border-blue-500")
    } else if (arg1 == "c") {
        document.getElementById("b").classList.remove("border-blue-500");
        document.getElementById("a").classList.remove("border-blue-500");
        document.getElementById("d").classList.remove("border-blue-500");
        document.getElementById(currentlySelected).classList.add("border-blue-500")
    } else if (arg1 == "d") {
        document.getElementById("b").classList.remove("border-blue-500");
        document.getElementById("c").classList.remove("border-blue-500");
        document.getElementById("a").classList.remove("border-blue-500");
        document.getElementById(currentlySelected).classList.add("border-blue-500")
    }
  

}

function next() {
    console.log(problemSet)

    document.getElementById("next_btn").classList.add("hidden")
    document.getElementById("check_btn").classList.remove("hidden")
    document.getElementById("a").classList.remove("border-blue-500");
    document.getElementById("b").classList.remove("border-blue-500");
    document.getElementById("c").classList.remove("border-blue-500");
    document.getElementById("d").classList.remove("border-blue-500");

    document.getElementById("a").classList.remove("bg-green-600")
    document.getElementById("a").classList.add("hover:")

    document.getElementById("b").classList.remove("bg-green-600")
    document.getElementById("b").classList.add("hover:")

    document.getElementById("c").classList.remove("bg-green-600")
    document.getElementById("c").classList.add("hover:")

    document.getElementById("d").classList.remove("bg-green-600")
    document.getElementById("d").classList.add("hover:")


    document.getElementById("a").classList.remove("bg-red-900")
    document.getElementById("a").classList.add("hover:")
    document.getElementById("b").classList.remove("bg-red-900")
    document.getElementById("b").classList.add("hover:")
    document.getElementById("c").classList.remove("bg-red-900")
    document.getElementById("c").classList.add("hover:")
    document.getElementById("d").classList.remove("bg-red-900")
    document.getElementById("d").classList.add("hover:")


    if (problemSet == 1 ) {
    document.getElementById("question").innerHTML = "Q2: What was the original intent of the internet?"
    document.getElementById("a").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">A</span> Send GIF's to people all over the globe.`;
    document.getElementById("b").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">B</span> Sharing of important academic information/research to different universities.`;
    document.getElementById("c").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">C</span> Making the telephone more powerful.`;
    document.getElementById("d").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">D</span> Communicating with aliens.`
    } else if (problemSet == 2) {
        document.getElementById("question").innerHTML = "Q3: What is the internet?"
        document.getElementById("a").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">A</span> A network of computers that can be connected to each other.`;
        document.getElementById("b").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">B</span> The enemies in a videogame.`;
        document.getElementById("c").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">C</span> 12G fiber waves traveling through the air.`;
        document.getElementById("d").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">D</span> Carrier pigeons that carry radio signals.`
} else if (problemSet == 3) {
    document.getElementById("question").innerHTML = "Q4: Which of the following are three specific areas of cybersecurity?"
    document.getElementById("a").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">A</span> Application Security, Network Security, and Endpoint Security.`;    
    document.getElementById("b").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">B</span> Bit Security, Wirefrail Security, Nougat Security.`;
    document.getElementById("c").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">C</span> RAT, HAM, LIDAR.`;
    document.getElementById("d").innerHTML = `<span class="rounded-lg  px-3 py-1 mr-1">D</span> 5G, 4G, 3G.`
}

}

//a
function p1() {
    document.getElementById("check_btn").classList.add("hidden")

    if (problemSet == 0 ) {
         if (currentlySelected == "a") score++;
    document.getElementById("a").classList.add("bg-green-600")
    document.getElementById("a").classList.remove("hover:")
    document.getElementById("b").classList.add("bg-red-900")
    document.getElementById("b").classList.remove("hover:")
    document.getElementById("c").classList.add("bg-red-900")
    document.getElementById("c").classList.remove("hover:")
    document.getElementById("d").classList.add("bg-red-900")
    document.getElementById("d").classList.remove("hover:")
    document.getElementById("next_btn").classList.remove("hidden")

    } 

    if (problemSet == 1 ) {
        if (currentlySelected == "b") score++;

        document.getElementById("b").classList.add("bg-green-600")
        document.getElementById("b").classList.remove("hover:")
        document.getElementById("a").classList.add("bg-red-900")
        document.getElementById("a").classList.remove("hover:")
        document.getElementById("c").classList.add("bg-red-900")
        document.getElementById("c").classList.remove("hover:")
        document.getElementById("d").classList.add("bg-red-900")
        document.getElementById("d").classList.remove("hover:")

        document.getElementById("next_btn").classList.remove("hidden")
    }

    if (problemSet == 2 ) {
        if (currentlySelected == "a") score++;

        document.getElementById("a").classList.add("bg-green-600")
        document.getElementById("a").classList.remove("hover:")
        document.getElementById("b").classList.add("bg-red-900")
        document.getElementById("b").classList.remove("hover:")
        document.getElementById("c").classList.add("bg-red-900")
        document.getElementById("c").classList.remove("hover:")
        document.getElementById("d").classList.add("bg-red-900")
        document.getElementById("d").classList.remove("hover:")
        document.getElementById("next_btn").classList.remove("hidden")

    }

    
    if (problemSet == 3 ) {
        if (currentlySelected == "a") score++;

        document.getElementById("a").classList.add("bg-green-600")
        document.getElementById("a").classList.remove("hover:")
        document.getElementById("b").classList.add("bg-red-900")
        document.getElementById("b").classList.remove("hover:")
        document.getElementById("c").classList.add("bg-red-900")
        document.getElementById("c").classList.remove("hover:")
        document.getElementById("d").classList.add("bg-red-900")
        document.getElementById("d").classList.remove("hover:")

        document.getElementById("next_btn").classList.add("hidden")
        document.getElementById("score_btn").classList.remove("hidden")
        
    }


    problemSet++;
    
}

function showScore() {
    document.getElementById("quiz").classList.add("hidden")
    document.getElementById("score").classList.remove("hidden")
    document.getElementById("score_amt").innerHTML = score;

    if (score < 3) {
        document.getElementById("phrase").innerHTML = "Nice try, but you can do better!";
        document.getElementById("tryagain").classList.remove("hidden");
    } else {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("nextstep").innerHTML = "Continue"
        document.getElementById("nextstep").onclick = function() {
            window.location.href = "./lesson2"
        }
    }
    };
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/progress?uid=${localStorage.getItem("token")}&lessoncode=c1a1`, true);
    xhttp.send();
}

}

function moveForward() {

 if (score > 3 || localStorage.getItem('cdone')) {
    window.location.href = "./lesson2"
 }
}

  window.onload = function () { 



    if (localStorage.getItem("tutorial_phase") == 1) {
      document.getElementById("dashboard_tutorial").classList.remove("hidden")
    }

    if (localStorage.getItem("tutorial_active")) {
      document.getElementById("tutorial_banner").classList.add("hidden")
    }
  }

  return (

    <div className="min-h-full " style={{ fontFamily: 'Poppins, sans-serif' }}>

      <Navigation />


      <main className="mt-3" >

        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8   ">
        <nav aria-label="Progress">
            <ol role="list" className="   rounded-md divide-y divide-gray-900 md:flex md:divide-y-0 border" style={{borderColor: "rgb(33, 33, 33)"}}>
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex-1 md:flex">
                  {step.status === 'complete' ? (
                    <Link to={step.href} className="group flex items-center w-full">
                      <span className="px-6 py-2 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-600 rounded-full ">
                          <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                        </span>
                        <span className="ml-4 text-sm font-medium text-white">{step.name}</span>
                      </span>
                    </Link>
                  ) : step.status === 'learning' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2  rounded-full">
                        <span className="text-white"><i class="fas fa-book"></i> {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'activity' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-white rounded-full">
                        <span className="text-white"><i class="fas fa-pencil-alt"></i>  {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'inprogress' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2  rounded-full">
                        <span className="text-white"><i class="fas fa-book"></i> {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'inprogress_a' ? (
                    <a href={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2  rounded-full">
                        <span className="text-white"><i class="fas fa-pencil-alt"></i>  {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </a>
                  ) : (
                    <a href={step.href} className="group flex items-center">
                      <span className="px-6 py-4 flex items-center font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2  rounded-full ">
                          <span className="text-white ">{step.id}</span>
                        </span>
                        <span className="ml-4 text-lg text-white ">{step.name}</span>
                      </span>
                    </a>
                  )}

                  {stepIdx !== steps.length - 1 ? (
                    <>
                      {/* Arrow separator for lg screens and up */}
                      <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                        <svg
                          className="h-full w-full"
                          style={{color: "rgb(33, 33, 33)"}}
                          viewBox="0 0 22 80"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0 -2L20 40L0 82"
                            vectorEffect="non-scaling-stroke"
                            stroke="currentcolor"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>







          {/*  YOU CONTENT STARTS HERE */}
          <div className="text-white">
            <br></br>

            <div className="flex items-center justify-between">
              <div>
            <h1 className="text-4xl font-semibold ">Activity</h1>
            <p><i class="fas fa-info-circle"></i>  This lesson references content from lesson 1.</p>
            </div>
            <div className="ml-2 flex-shrink-0 flex w-1/10">
            <button id="nextstep" onClick={() => {moveForward()}} className=" text-white text-xl border  px-6 py-3 hover: rounded-lg"><i class="fas fa-spinner text-white  fa-spin"></i> Awaiting Completion</button>
                    </div>
                    </div>


                  <div id="quiz" className=" mt-5  px-10 py-10 rounded-lg  " style={{backgroundColor: "rgb(33, 33, 33)" }}>
                      
                      <h1 id="question" className="text-2xl font-semibold">Q1: What is Cybersecurity?</h1>

            
                      <button id="a" onClick={() => {selectA('a')}} className="mt-4 px-6 py-3  border  rounded-lg hover:"><span className="rounded-lg  px-3 py-1 mr-1">A</span>   Cybersecurity is the practice of protecting electronic information by mitigating information risks and vulnerabilities. </button>
                      <br></br>
                      <button id="b" onClick={() => {selectA('b')}} className=" mt-4 px-6 py-3  border  rounded-lg hover:"><span className="rounded-lg  px-3 py-1 mr-1">B</span> Cybersecurity is about making sure the inner workings of security stays cyber.</button>
                      <br></br>
                      <button id="c" onClick={() => {selectA('c')}} className="mt-4 px-6 py-3  border  rounded-lg hover:"><span className="rounded-lg  px-3 py-1 mr-1">C</span> Cybersecurity is what the TSA uses to make sure only safe passengers board the plane.</button>
                      <br></br>
                      <button id="d"onClick={() => {selectA('d')}}  className=" mt-4 px-6 py-3  border  rounded-lg hover:"><span className="rounded-lg  px-3 py-1 mr-1">D</span>  Cybersecurity is responsible for giving electricity to our computers.</button>

<br></br>
<button onClick={p1} id="check_btn" className="mt-4 px-10 py-2 bg-blue-800 border border-blue-700 rounded-lg hover:bg-blue-900"><i class="fas fa-check-double"></i> Check Answer</button>
<button onClick={next} id="next_btn" className="hidden mt-4 px-10 py-2  border border-blue-700 rounded-lg hover:"> Next Question</button>
<button onClick={showScore}  id="score_btn" className="hidden  mt-4 px-10 py-2  border border-blue-700 rounded-lg hover:"><i class="fas fa-file-alt"></i> View Score</button>

                      </div>  

                      <div id="score" className="hidden mt-5  px-10 py-10 rounded-lg border  mx-auto text-center">
                      <h1  className="text-center text-6xl font-semibold"><span id="score_amt"></span> / 4</h1>
                      <h1  id="phrase" className="text-center text-4xl mt-4">Awesome work!</h1>
                      <button className="hidden mt-4 mx-auto text-white text-xl border  px-6 py-3 hover: rounded-lg">Share with teacher</button>
                    <div id="tryagain" className="hidden">
                      <br></br>                      <br></br>
                      <a href="./activity1"  className=" mt-6 mx-auto text-white text-xl border  px-6 py-3 hover: rounded-lg"><i class="fas fa-redo"></i> Try Again</a>
                      </div>
               </div>
                 
           <br></br>
               

         </div>

          {/*  YOU CONTENT ENDS HERE */}


        </div>

      </main>


    </div>


  )


}




export default Ch1_2;