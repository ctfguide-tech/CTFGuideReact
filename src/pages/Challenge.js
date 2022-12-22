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
            //  document.getElementById("moderator").classList.remove("hidden")
            }

            if (data.solvedChallenges) {
            if (data.solvedChallenges.includes(window.location.href.split("/")[4])) {
              document.getElementById("solvedChallenge").classList.remove("hidden");
            }
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

    <div className="min-h-full example" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navigation/>


      <main>
 
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">

          <div>

<div id="moderator" className="hidden mb-4 bg-gray-900 px-4 py-4 rounded-lg border border-gray-600 w-1/2">

  <h1 className="text-white text-xl"><i className="fas fa-user-shield"></i> Moderation Tools</h1>
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

            <div className="px-5  rounded-lg  ">
              <div>

              <div className="flex items-center justify-between">

                <div className="flex w-full my-auto">
              <h1 id="challengeName" className="mt-5 w-1/2 text-4xl text-white mb-4 font-semibold"></h1> 

              <div style={{backgroundColor: "#212121"}} className="ml-auto  w-1/6 my-auto  rounded-lg px-2 py-1">
                      <div className="text-sm mt-1   rounded-lg px-1 py-1 rounded-lg flex" >
            

            <div className="c-avatar" >

            <img width="70" className="rounded-full mx-auto c-avatar__image" src="https://avatars.githubusercontent.com/u/67762433?v=4"></img>


            </div>

            <div className=" pl-3">
            <div className="text-white text-lg font-bold">raym0nd <i className="fas fa-tools"></i></div>
            <div className=" text-sm" style={{color: "#8c8c8c"}}> Author</div>
    
          </div>            
   
      </div>
      </div>
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
              

                  <p id="challengeDetails" style={{color: "#8c8c8c"}} className="w-5/6 text-white text-lg">
                      
                    </p>

<div className="flex ">
               


                      <div className="mt-4 rounded-lg">
                      <div className="text-sm    rounded-lg   rounded-lg flex" >
            

          

            <div style={{color: "#8c8c8c"}} className="mb-4">

            <input id="enteredFlag"  style={{backgroundColor: "#212121"}} placeholder="Flag Here"  className="mx-auto text-white  focus-outline-none  outline-none px-4 py-1 rounded-lg mr-2 bg-black border border-gray-700"></input>
                      <button id="enterFlagBTN" onClick={submitFlag} className="  bg-green-700   rounded-lg  hover:bg-green-900 text-green-300 px-4 py-1">Submit Flag</button>
                  

                      <button onClick={() => setOpen(true)} className="mt-4  bg-black  rounded-lg  bg-yellow-700 text-yellow-300 hover:bg-yellow-900 text-white px-4 py-1 ml-2">Stuck?</button>



          </div>            
   
      </div></div>
                      </div>


                      <div className="mt-6 grid lg:grid-cols-3 gap-10 sm:grid-cols-1">

                            <div style={{backgroundColor: "#212121"}} className="w-full py-3 card mx-auto text-center">
                              <div className="card-body">   
                                <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-yellow-400  text-2xl font-semibold">#1</h1>
                                <p className="text-white text-lg">Laphatize</p>

                            </div>
                            </div>
                            
                            <div style={{backgroundColor: "#212121"}} className="w-full py-3 card mx-auto text-center">
                              <div className="card-body">   
                                <h1 className="text-white text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500 " >#2</h1>
                                <p className="text-white text-lg">Raymond</p>

                            </div>
                            </div>

                            <div style={{backgroundColor: "#212121"}} className="w-full py-3 card mx-auto text-center">
                              <div className="card-body">   
                                <h1 className="text-white text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-500">#3</h1>
                                <p className="text-white text-lg">Joshua</p>

                            </div>
                            </div>
                            
                      </div>               
                  
                    <div id="terminal" className=" mt-6 ">
                  <p className="text-gray-400 mb-2 hint"><span className="text-white ">Terminal (Beta)</span> Login as <span className="text-yellow-400">{userData.susername}</span> using the password <span className="text-yellow-400">{userData.spassword}</span><a style={{ cursor: 'pointer'}} className="hidden hover:bg-black text-gray-300">Need help?</a></p>
                    <iframe className="w-full" height="500" src="https://terminal.ctfguide.com/wetty/ssh/root?pass=" ></iframe>
                       </div>


            </div>

            <div className="mt-5 rounded-lg px-5 ">
                    <h1 className="text-white text-3xl font-semibold">Comments</h1>
                    <textarea id="comment"  style={{backgroundColor: "#212121"}} className="border-none mt-4 text-white focus-outline-none outline-none block w-full bg-black rounded-lg"></textarea>
                  
                    <button onClick={ () => {
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                          if (this.status === 200 && this.readyState === 4) {
                            window.location.reload();
                          } 
                        }
                        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/comments/post?comment=${document.getElementById("comment").value}&uid=${localStorage.getItem("token")}&challengeID=${window.location.href.split("/")[4]}`);
                        xhttp.send();
                   }} id="commentButton" style={{backgroundColor: "#212121"}} className="mt-4 border border-gray-700 bg-black hover:bg-gray-900 rounded-lg text-white px-4 py-1">Post Comment</button>
                    <h1 id="commentError" className="hidden text-red-400 text-xl px-2 py-1 mt-4">Error posting comment! This could be because it was less than 5 characters or greater than 250 characters. </h1>

                

                      {

challenge.data.map((item) => (

  <div className="mt-4 bg-black rounded-lg  " style={{backgroundColor: "#212121"}} >
  <h1 className="text-white px-5 pt-4 text-xl">@{ item.username }</h1>
  <p className="px-5 text-white pb-4 space-y-10"><span className="mb-5">{ item.comment }</span><br className="mt-10"></br><a onClick={() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        window.alert("Thank you for reporting this challenge. Our moderation team will look into this.")
      } 

      if (this.status != 200 && this.readyState === 4) {
        window.alert("Error reporting comment. Please try again later. ")
      }
    }
    xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/report?commentID=${item.id}&uid=${localStorage.getItem("token")}&challengeID=${window.location.href.split("/")[4]}`);
    xhttp.send();
  }} className="mt-4 text-red-600 hover:text-red-500  ">Report Comment</a></p>
  </div>

))

}


              </div>


 
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
              <div className="mt-5 sm:mt-6 mx-auto text-center flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-auto rounded-md shadow-sm px-4 py-2 bg-gray-800 border border-gray-700 text-base font-medium text-white  focus:outline-none  sm:text-sm"
                  onClick={() => window.location.href = "../leaderboards/global"}
                >
                  View Leaderboards
                </button>
                <button
                  type="button"
                  className="ml-2 w-auto inline-flex justify-center   rounded-md shadow-sm px-4 py-2 bg-gray-800 border border-gray-700 text-base font-medium text-white  focus:outline-none  sm:text-sm"
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