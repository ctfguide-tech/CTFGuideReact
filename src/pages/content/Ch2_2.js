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
import YouTube  from "react-youtube";

const Ch2_2 = () => {
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

  function next() {
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("nextstep").innerHTML = "Continue"
        document.getElementById("nextstep").onclick = function() {
            window.location.href = "./activity1";
        }
    }
    };
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/progress?uid=${localStorage.getItem("token")}&lessoncode=c2l1`, true);
    xhttp.send();


  }
  const opts = {
    height: '390',
    width: '640',

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }

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

            setUserData({
              username: data.username,
              streak: data.streak,
              continueWorking: data.continueWorking,
              points: data.points
            })

            if (data.lessonsCompleted) {
              if (data.lessonsCompleted.includes("c2l1")) {
                  document.getElementById("nextstep").innerHTML = "Onward!"
                  document.getElementById("nextstep").onclick = function() {
                    window.location.href = "./activity1";
                }
              }
              
          }
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
    { id: '', name: 'Introduction to Linux', href: '/learn/chapter2/lesson1', status: 'learning' },
    { id: '', name: 'Review Activity', href: '/learn/chapter2/activity1', status: 'inprogress' },
    { id: '', name: 'Interacting with Linux', href: '/learn/chapter2/lesson2', status: 'learning' },
    { id: '', name: 'Linux on CTFGuide', href: '/learn/chapter2/lesson2', status: 'activity' },

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

 

var problemSet = 0;
var currentlySelected = "nothing";
var score = 0;



function check() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var serverResponse = this.responseText;
        if (!serverResponse) document.write("Something went wrong when trying to check your answers.")
      }
    };
    xhttp.open("POST", `${process.env.REACT_APP_API_URL}/challenge/learn/activity/check?id=ch2a1`)

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



  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function dashboardTutorial() {
    document.getElementById("dashboard_tutorial").classList.remove("hidden")
  }
  function dashboardTutorialDone() {
    window.location.href = "../practice"
  }

  window.onload = function () {
    if (localStorage.getItem("tutorial_phase") == 1) {
      document.getElementById("dashboard_tutorial").classList.remove("hidden")
    }

    if (localStorage.getItem("tutorial_active")) {
      document.getElementById("tutorial_banner").classList.add("hidden")
    }
  }

  var answerFile = {
    q1: "none",
    q2: "none",
    q3: "none",
    q4: "none",
    q5: "none",
    q6: "none"
  }


  


  function solution(id) {
      let base = id.substring(0, 2);
      let answer = id.substring(2, 3)
      //window.alert(`${answer} was given for q: ${base}`)

      answerFile[`${base}`] = answer;

      window.alert(JSON.stringify(answerFile))

  }

  function machineLearningSolve(id, studentResponse) {
    // what did you expect here, a million if statements??
    let base = id.substring(0, 2);
    answerFile[`${base}`] = studentResponse;
  }
  

  return (

    <div className="min-h-full " style={{ fontFamily: 'Space Grotesk, sans-serif' }}>

      <Navigation />


      <main className="mt-3" >

        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8   ">

        
        <nav aria-label="Progress">
            <ol role="list" className="border bg-gray-900 border-gray-700 rounded-md divide-y divide-gray-900 md:flex md:divide-y-0">
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
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-700 rounded-full">
                        <span className="text-white"><i class="fas fa-book"></i> {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'activity' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-700 rounded-full">
                        <span className="text-white"><i class="fas fa-pencil-alt"></i>  {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'inprogress' ? (
                    <Link to={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full">
                        <span className="text-white"><i class="fas fa-book"></i> {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </Link>
                  ) : step.status === 'inprogress_a' ? (
                    <a href={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full">
                        <span className="text-white"><i class="fas fa-pencil-alt"></i>  {step.id}</span>
                      </span>
                      <span className="ml-4 text-lg font-medium text-white">{step.name}</span>
                    </a>
                  ) : (
                    <a href={step.href} className="group flex items-center">
                      <span className="px-6 py-4 flex items-center font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-700 rounded-full ">
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
                          className="h-full w-full text-gray-700"
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
            <h1 className="text-4xl font-semibold ">Review Activity</h1>
            <p><i class="fas fa-info-circle"></i>  Some questions are graded using machine learning algorithms. <a className="text-blue-400" href="https://ctfguide.com/m/ml_usage">Learn more.</a></p>
            </div>


                    <div>Unlock to CTFGuide PRO to access this activity.</div>

            <div className="ml-2 flex-shrink-0 flex w-1/10">
            <button id="nextstep" className=" text-white text-xl border border-gray-500 px-6 py-3 hover:bg-gray-900 rounded-lg"><i class="fas fa-spinner text-white  fa-spin"></i> Awaiting Completion</button>
                    </div>
                    </div>
           
                    <div id="quiz" className=" mt-5 bg-gray-900 px-10 py-10 rounded-lg border border-gray-700">
                      
                      <h1 id="question1" className="text-2xl font-semibold">Q1: What is Linux?</h1>
                      <div id="question1grading" className="hidden"><i class="fas fa-spinner text-white  fa-spin mt-3"></i>  Grading...</div>
                      <div id="question1correct" className="hidden border-l-4 border-green-400 bg-gray-800">&nbsp;&nbsp;Correct</div>
                      <div id="question1wrong"className="hidden border-l-4 border-red-400 bg-gray-800">&nbsp;&nbsp;Incorrect</div>

                      <textarea placeholder="Keep it short and sweet. We'll be using machine learning to grade this response." className="mt-3 border-gray-700 bg-gray-900 px-2 py-1 rounded-lg w-full">

                      </textarea>
                
                      <h1 id="question2" className="mt-6 text-2xl font-semibold">Q2: Linux was made by Bill Gates.</h1>
                      <select className="mt-3 bg-gray-900 rounded-lg border border-gray-700 w-1/2">
                        <option>True</option>
                        <option>False</option>

                      </select>
    
<h1 id="question3" className="mt-6 text-2xl font-semibold">Q3: What makes Linux different from an operating system like Windows?</h1>
<div id="question3grading" className="hidden"><i class="fas fa-spinner text-white  fa-spin mt-3"></i>  Grading...</div>
                      <div id="question3correct" className="hidden border-l-4 border-green-400 bg-gray-800">&nbsp;&nbsp;Correct</div>
                      <div id="question3wrong"className="hidden border-l-4 border-red-400 bg-gray-800">&nbsp;&nbsp;Incorrect</div>

<textarea placeholder="Keep it short and sweet. We'll be using machine learning to grade this response." className="mt-3 border-gray-700 bg-gray-900 px-2 py-1 rounded-lg w-full">

</textarea>



<h1 id="question6" className="mt-6 text-2xl font-semibold">Q4: How's the learning going? <span className="text-sm ">Not Graded</span></h1>
<i class="fas fa-spinner text-white  fa-spin mt-3"></i>  Analyzing...
<textarea placeholder="Pretend like you're talking to your teacher. We can modify your learning experience automatically with our machine learning algorithms." className="mt-3 border-gray-700 bg-gray-900 px-2 py-1 rounded-lg w-full">

</textarea>

<button id="check_btn" className="mt-4 px-10 py-2 bg-blue-800 border border-blue-700 rounded-lg hover:bg-blue-900"><i class="fas fa-check-double"></i> Check Answers</button>
<button onClick={showScore}  id="score_btn" className="hidden  mt-4 px-10 py-2  border border-blue-700 rounded-lg hover:bg-black"><i class="fas fa-file-alt"></i> View Score</button>

                      </div>  

           <br></br>
               

         </div>

          {/*  YOU CONTENT ENDS HERE */}


        </div>

      </main>


    </div>


  )


}




export default Ch2_2;