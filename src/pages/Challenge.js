import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition , Dialog} from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, StarIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Navigation } from "../components/navigation";
import { SuccessModal } from "../components/successModal";
import 'animate.css';
import { marked } from 'marked';
const Practice = () => {
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

            if (data.role == "moderator" || data.role == "developer") {
              document.getElementById("moderator").classList.remove("hidden")
            }
            if (data.solvedChallenges.includes(window.location.href.split("/")[4])) {
              document.getElementById("solvedChallenge").classList.remove("hidden");
            }

              document.getElementById("navPoints").innerHTML = data.points
            setUserData({
              points: data.points,
              susername: data.vmUsername,
              spassword: data.vmPassword,
            })


            if (data.createdChallenges) {
              data.createdChallenges.forEach(challenge => {
                 if (challenge == window.location.href.split("/")[4]) {
                  document.getElementById("editButton").classList.remove("hidden");
                }
              });

          }



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
       
            document.getElementById("challengeDetails").innerHTML = marked.parse(data.problem);
            setChallenges({
              data: data.comments
            });
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
      
      setTimeout(function() {
        document.getElementById("enteredFlag").classList.remove("border-red-600");
      }, 2000)
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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

            setTimeout(function() {
              document.getElementById("enteredFlag").classList.remove("border-green-600");
              
            }, 2000)
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
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/check/${window.location.href.split("/")[4]}?uid=${auth.currentUser.uid}&flag=${flag}`);
    xhttp.send();
  }

  function editChallenge() {
    window.location.href =  "/challenges/" + window.location.href.split("/")[4] + "/edit";
  }

  function showTerminal() {
    document.getElementById("terminal").classList.remove("hidden");
  }
  const navigation = [
    { name: 'Dashboard', href: '../dashboard', current: false },
    { name: 'Practice', href: '../practice', current: false },
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
      <Navigation/>


      <main>
 
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">

          <div>

<div id="moderator" className="hidden mb-4 bg-gray-900 px-4 py-4 rounded-lg border border-gray-600 w-1/2">

  <h1 className="text-white text-xl"><i class="fas fa-user-shield"></i> Moderation Tools</h1>
  <p className="text-white mb-2">
    Challenge Owner: <span>Unknown (Probably Legacy)</span><br></br>
    Challenge Status: <span>Not verified but Legacy</span>
  </p>
  <button onClick={() => {
      // send http request to verify
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var serverResponse = JSON.parse(this.responseText);
          if (serverResponse) {
            console.log(serverResponse.message)
            if (serverResponse.message == "OK") {
              window.location.reload();
            }
          }
        }
      }
      xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/verify?uid=${auth.currentUser.uid}&id=${window.location.href.split("/")[4]}`);
      xhttp.send();
   }} className="bg-green-700 hover:bg-green-800 text-white rounded-lg px-2 py-1">Verify Challenge</button>
  <button className="ml-2 bg-red-700 hover:bg-red-800 text-white rounded-lg px-2 py-1">Delete Challenge</button>

</div>

            <div className="px-5 py-10 rounded-lg  bg-gray-900 border border-gray-700">
              <div>

              <div className="flex items-center justify-between">
              <h1 id="challengeName" className="text-4xl text-white mb-4 font-semibold"></h1> 
              <div className="ml-2 flex-shrink-0 flex mb-5">
              <p id="solvedChallenge" className="hidden text-white bg-green-700 w-60 px-2 py-1 rounded-lg border-green-800 border"><i className="fas fa-check-circle text-white"></i> You solved this challenge</p>
              <p id="editButton" onClick={editChallenge} style={{cursor: 'pointer'}} className="hidden ml-3 border border-gray-700 bg-black hover:bg-gray-900 rounded-lg text-white px-2 py-1 w-40  border mx-auto text-center"><i className="fas fa-pencil-alt text-white"></i> Edit Challenge</p>

              <p style={{cursor: 'pointer'}}className="hidden ml-4 text-white font-semibold border-blue-600 w-50 py-1 px-3 rounded-lg hover:bg-gray-900 text-blue-500 border"><i class="fas fa-trophy text-blue-500"></i> Leaderboards</p>

                    </div>
              </div>
      
              </div>


              <div id="suggestedLoader" className="mt-2 px-4 py-4 ">
                <div className="flex items-center justify-between">



                  <div>
                    <h1 className="text-xl text-white">One second please...</h1> 
                  </div>


                </div>
              </div>
              

                  <p id="challengeDetails" className="text-white text-xl">
                      
                    </p>

                      <input id="enteredFlag" placeholder="Flag Here" className="text-white  focus-outline-none  outline-none px-4 py-1 rounded-lg mr-2 bg-black border border-gray-700"></input>
                      <button id="enterFlagBTN" onClick={submitFlag} className="mt-4 border bg-black border-green-500  rounded-lg  hover:bg-gray-900 text-green-500 px-4 py-1">Submit Flag</button>
                      <button onClick={() => setOpen(true)} className="mt-4 border bg-black  rounded-lg  border-yellow-300 text-yellow-300 hover:bg-gray-900 text-white px-4 py-1 ml-2">Stuck?</button>
                      
                    <div id="terminal" className=" mt-6 ">
                  <p className="text-gray-400 mb-2 hint"><span className="text-white ">Terminal (Beta)</span> Login as <span className="text-yellow-400">{userData.susername}</span> using the password <span className="text-yellow-400">{userData.spassword}</span><a style={{ cursor: 'pointer'}} className="hidden hover:bg-black text-gray-300">Need help?</a></p>
                    <iframe className="w-full" height="500" src="https://terminal.ctfguide.com/wetty/ssh/root?pass=" ></iframe>
                       </div>


            </div>

            <div className="mt-5 bg-gray-900 border border-gray-700 rounded-lg px-5 py-10">
                    <h1 className="text-white text-3xl font-semibold">Comments</h1>
                    <textarea id="comment" className="mt-4 text-white border border-gray-700 focus-outline-none outline-none block w-full bg-black rounded-lg"></textarea>
                    <button onClick={ () => {
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                          if (this.status === 200 && this.readyState === 4) {
                            window.location.reload();
                          }
                        }
                        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/comments/post?comment=${document.getElementById("comment").value}&uid=${localStorage.getItem("token")}&challengeID=${window.location.href.split("/")[4]}`);
                        xhttp.send();
                   }} id="commentButton" className="mt-4 border border-gray-700 bg-black hover:bg-gray-900 rounded-lg text-white px-4 py-1">Post Comment</button>

                

                      {

challenge.data.map((item) => (

  <div className="mt-4 bg-black rounded-lg border border-gray-700">
  <h1 className="text-white px-5 pt-4 text-xl">@{ item.username }</h1>
  <p className="px-5 text-white pb-4 space-y-10"><span className="mb-5">{ item.comment }</span><br className="mt-10"></br><a href="" className="mt-4 text-red-600 hover:text-red-500  ">Report Comment</a></p>
  </div>

))

}


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
                    <div class="hidden bg-gray-800 rounded-lg px-4 py-2 mt-4">


                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-white  uppercase">Hint 1</p>
                        
                        </div>
                        <div class="ml-2 flex-shrink-0 flex w-1/10">
                          <button class="border text-white border-green-500 px-4 py-1 rounded-lg hover:bg-gray-900">Unlock Hint</button>
                          </div>
                          </div>
                  
                  
                  
                  
                    </div>

                    <div class="hidden bg-gray-800 rounded-lg px-4 py-2 mt-4">


<div class="flex items-center justify-between">
  <div>
    <p class="text-white  uppercase">Hint 2</p>
    
    </div>
    <div class="ml-2 flex-shrink-0 flex w-1/10">
      <button class="border text-white border-green-500 px-4 py-1 rounded-lg hover:bg-gray-900">Unlock Hint</button>
      </div>
      </div>




</div>

<div class="hidden bg-gray-800 rounded-lg px-4 py-2 mt-4">


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
                    <div className="text-white">
                    <h1 className=" text-xl mb-2">There are no hints for this challenge.</h1>
                 
                      Feel free to join our <a className="text-yellow-400 hover:text-white" href="https://discord.gg/q3hgRBvgkX">Discord server</a> for help.
                    
                   
                 </div>
                    {/* /End replace */}
               
               
                    <div className="text-white hidden">
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


      <p className="mt-4 text-gray-500 py-6 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/terms-of-service.md">Terms of Service</a> • <a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/privacy-policy.md">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

  
      <Transition.Root show={open2} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen2}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-gray-900 border border-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center rounded-full ">
                  <StarIcon className="h-12 w-12 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-100">
                   Nice hackin', partner!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-200">
                     You were awarded <span>{localStorage.getItem("award")}</span> points.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 mx-auto text-center">
                <button
                  type="button"
                  className="inline-flex justify-center w-1/2 rounded-md shadow-sm px-4 py-2 bg-gray-800 border border-gray-700 text-base font-medium text-white  focus:outline-none  sm:text-sm"
                  onClick={() => window.location.href = "../leaderboards/global"}
                >
                  View Leaderboards
                </button>
                <button
                  type="button"
                  className="ml-2 inline-flex justify-center   rounded-md shadow-sm px-4 py-2 bg-gray-800 border border-gray-700 text-base font-medium text-white  focus:outline-none  sm:text-sm"
                  onClick={() => window.location.href = "../practice/all"}
                >
                  Back to Challenges
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    </div>

  )
}


export default Practice;