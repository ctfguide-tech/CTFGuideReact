import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Navigation } from '../components/navigation';
import 'animate.css';

const Practice = () => {

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

  document.title = "CTFGuide - Practice"
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    imageUrl: 'https://ctfguide.com/demopfp.png'
  });

  const [challenge, setChallenges] = useState({
    data: []
  })

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
            document.getElementById("navPoints").innerHTML = data.points;

            setUserData({
              username: data.username,
              streak: data.streak,
              continueWorking: data.continueWorking,
              points: data.points
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

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            // Success!
            console.log(JSON.parse(this.responseText));
            setChallenges({
              data: JSON.parse(this.responseText)
            })
            document.getElementById("suggestedLoader").classList.add("hidden");
          }
        }
        xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/all`);
        xhttp.send();




      } else {
        window.location.href = "../login";
      }
    });
  }, []);
  const navigation = [
    { name: 'Dashboard', href: './dashboard', current: false },
    { name: 'Practice', href: './practice', current: true },
    { name: 'Learn', href: './learn', current: false },
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

  function practiceTutorialDone() {
    
      localStorage.setItem("practiceTutorial", "true");
    localStorage.setItem("tutorial_phase", "3");

    window.location.href = "../challenges/2Hr3KHnaqUW6YFrvjwuc"
  }

  window.onload = function () {
    if (localStorage.getItem("tutorial_phase") == 1) {
      document.getElementById("practice_tutorial").classList.remove("hidden");
  
    }
  
  }



  return (

    <div className="min-h-full" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>

<Navigation/>

      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

          <div>



            <div className="">
              <div>
              <div className="flex items-center justify-between">
              <h1 className="text-4xl text-white mb-4  ">Practice Problems</h1>

              <div className="ml-2 flex-shrink-0 flex">
                <select
                  id="location"
                  name="location"
                  className="mt-1 mb-4  w-full pl-3 pr-20  py-2 text-base border-gray-700 text-white bg-gray-900 focus:outline-none  sm:text-sm rounded-md"
                  defaultValue="All"
                  onChange={(e) => {
                    window.alert(e.target.value);
                    switch (e.target.value) {
                      case "Easy":
                        document.getElementsByClassName("medium").forEach(element => {
                          element.style.display = "none";
                        })
                        document.getElementsByClassName("hard").forEach(element => {
                          element.style.display = "none";
                        })
                    }
                  }}
                >
                  <option>All</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                </div>
                </div>

              </div>

              <div id="suggestedLoader" className="hidden mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-blue-900">
                <div className="flex items-center justify-between">



                  <div>
                    <h1 className="text-xl">One second please...</h1>
                  </div>


                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-2">
                {

                  challenge.data.map((item) => (


                    <Link
                  //  onClick={() => {this.props.history.push(`./challenges/${item.id}`)}}
                  to={`../challenges/${item.id}`}
                     style={{cursor: 'pointer'}}
                      key={item.title}
                      className={(item.difficulty) + "animate__animated animate__fadeIn px-3 py-2  rounded-md bg-gray-900 border border-gray-700  mb-2  text-base font-medium text-white hover:text-white "}
                    ><span className="font-semibold">{item.title} </span>
                  <br></br>
                      <span className={"lowercase " +  (item.difficulty === 'hard' ? 'text-red-500' : item.difficulty === 'medium' ? ' text-yellow-500' : 'text-green-500')}> {item.difficulty}</span> <b>∙</b><span className="bg-black rounded-lg px-2  lowercase">{item.category}</span>
                  
                    </Link>

                  ))


                }
              </div>


            </div>


            <hr class="mt-10 ml-4 mr-4 mb-4 border-gray-700 hidden" />
            <div className="mt-6 hidden">
              <h1 className="text-4xl text-white mb-4">Challenges by category</h1>

              <div className="mt-2 bg-gray-900 px-4 py-4 text-white rounded border border-blue-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl">One second please...</h1>
                  </div>


                </div>
              </div>




            </div>

          </div>


          <div className="hidden px-4 py-4 sm:px-0">
            <div className=" rounded-lg h-96" />



          </div>
          {/* /End replace */}


          <p className="mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>



          <div id="practice_tutorial" className="hidden fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
   
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity" aria-hidden="true"></div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

 
    <div className="inline-block align-bottom shadow-lg shadow-blue-900/50 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
      <div>
    
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-4xl leading-6 font-semibold text-white" id="modal-title">Practice</h3>
          <div className="mt-4">
            <p className="text-xl px-5 text-white">CTFGuide has 100s of community uploaded challenges for you to use for <b>FREE</b>. There are three difficultes and various categories.</p>
            <iframe className="mt-4 w-full px-5 mt-4 h-80" src="https://www.youtube-nocookie.com/embed/QU952BUA9Gk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; hide-info;"></iframe>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 mx-auto text-center">
        <button onClick={practiceTutorialDone} type="button" className="hover:bg-gray-800 mt-3 w-1/2 text-xl inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-white text-base font-medium sm:mt-0 sm:col-start-1 ">Continue</button>
      </div>
    </div>
  </div>
</div>
        </div>


        
      </main>
    </div>

  )
}


export default Practice;