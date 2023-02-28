import { Link, useNavigate } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Combobox, Dialog} from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon, UsersIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Navigation } from '../components/navigation';
import 'animate.css';

const Practice = () => {



  function move(hn, path) {
    !!hn.navigate ? hn.navigate(path) : hn.push(path);
  }
  let navigate = useNavigate();
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
  const people = [
    { id: 1, name: 'this is like so in beta bruh', url: '#' },
    // More people...
  ]

  // Initialize Firebase


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

  
  
  let filteredChallenges = ''


  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')


  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }

  useEffect(() => {

    function loadChallenges(difficulty) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          // Success!
          console.log(JSON.parse(this.responseText));
          challenge.data = []
          setChallenges({
            data: JSON.parse(this.responseText)
          })
          document.getElementById("suggestedLoader").classList.add("hidden");
        }
     }
      xhttp.open("GET", `${process.env.REACT_APP_API_URL}/challenges/type/${difficulty}`);
      xhttp.send();
    }

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

           filteredChallenges =
            query === ''
            ? []
            : challenge.data.filter((challenge) => {
                return challenge.data.title.toLowerCase().includes(query.toLowerCase())
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



      loadChallenges(window.location.href.split("/")[4])


      } else {
        window.location.href = "../login";
      }
    });
  }, [navigate]);
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

    <div className="min-h-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
   <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform rounded-xl bg-gray-900  shadow-2xl  border-gray-700 transition-all"
            onChange={(challenge) => (window.location = challenge.data.id)}
          >
            <Combobox.Input
              className=" focus:ring-0 focus:border-gray-700  w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white sm:text-sm"
              placeholder="Search for a challenge"
              onChange={(event) => setQuery(event.target.value)}
            />

            {filteredChallenges.length > 0 && (
              <Combobox.Options
                static
                className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-white"
              >
                {filteredChallenges.map((challenge) => (
                  <Combobox.Option
                    key={challenge.id}
                    value={challenge}
                    className={({ active }) =>
                      classNames(
                        'cursor-pointer select-none rounded-md px-4 py-2',
                        active && ' text-white'
                      )
                    }
                  >
                    {challenge.title}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query !== '' && filteredChallenges.length === 0 && (
              <div className="py-14 px-4 text-center sm:px-14">
                <UsersIcon className="hidden mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 text-3xl text-gray-400">😢 No challenges found.</p>
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
<Navigation/>

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
                  style={{backgroundColor: "rgb(33, 33, 33)"}}
                  className="mt-1 mb-4  w-full pl-3 pr-20  py-2 text-base border-gray-700 text-white bg-gray-900 focus:outline-none  sm:text-sm rounded-md"
                  defaultValue={window.location.href.split("/")[4]}
                  onChange={(e) => {
        
                    window.location.href =  "../../practice/" + e.target.value
                  }}
                >
                  <option value="all">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
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
                     style={{cursor: 'pointer', backgroundColor: "rgb(33, 33, 33)"}}
                      key={item.title}
                      className={(item.difficulty) +  " " + ((item.verified === false ? 'hidden' : 'visible')) + "  animate__animated animate__fadeIn px-3 py-2  rounded-md  mb-2  text-base font-medium text-white hover:text-white "}
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


    
          <p className="mt-4 text-gray-500 py-6 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/terms-of-service.md">Terms of Service</a> • <a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/privacy-policy.md">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

  

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