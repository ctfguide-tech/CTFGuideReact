import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { SparklesIcon, LightningBoltIcon } from '@heroicons/react/outline'
import { Features } from '../components/features';

const Home = () => {

  document.title = "CTFGuide"

  
  return (
  
    <div className="relative bg-black overflow-hidden bg-black" >
      <div className="hidden bg-black lg:block lg:absolute lg:inset-0" aria-hidden="true">
        <svg
          className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
          width={640}
          height={784}
          fill="none"
          viewBox="0 0 640 784"
        >
          <defs>
            <pattern
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              x={118}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor" />
          <rect x={118} width={404} height={784} fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
        </svg>
      </div>

      <div className="bg-black relative pt-6 pb-10 sm:pb-12 lg:pb-24">
        <Popover>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link to="#">
                  <span className="sr-only">CTFGuide</span>
                 
                  <div className="flex-shrink-0 flex items-center">
				
                <img src="./CTFGuide trans dark.png" width="70"/> <span style={{fontFamily: 'Space Grotesk, sans-serif'}} className="w-auto font-semibold text-3xl text-white">CTFGuide</span>
                </div>


                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>

                
            <div className="hidden md:block text-right">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                <Link
                  to="./register"
                  style={{fontFamily: 'Space Grotesk, sans-serif', cursor: 'pointer'}}
                  className="inline-flex items-center px-10 py-2 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                 <i class="mr-2 fas fa-user-plus"></i> Register
                </Link>
              </span>
            </div>

            <div className="ml-2 hidden md:block text-right">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                <Link
                  to="./login"
                  style={{fontFamily: 'Space Grotesk, sans-serif', cursor: 'pointer'}}
                  className="inline-flex items-center px-10 py-2 border borde border-gray-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 hover:border-gray-700"
                >
                  <i class="fas fa-sign-in-alt mr-2"></i> Log in
                </Link>
              </span>
            </div>
          </nav>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-sm shadow-blue-600 bg-black ring-1 ring-black ring-opacity-5 overflow-hidden  border border-2 border-blue-700">
                <div className="px-5 pt-4 flex items-center justify-between">
                <Link to="#">
                  <span className="sr-only">CTFGuide</span>
                 
                  <div className="flex-shrink-0 flex items-center">
				
                <img src="./CTFGuide trans dark.png" class="w-10"/> <span style={{fontFamily: 'Space Grotesk, sans-serif'}} className="w-auto font-semibold text-xl text-white">CTFGuide</span>
                </div>


                </Link>
                  <div className="-mr-2">
                    <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
               
                <Link
                  to="./Login"
                  className="block w-full px-5 py-3 text-sm text-center font-medium text-white bg-gray-900 hover:bg-gray-800  mt-4"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  Log in
                </Link>
                <Link
                  to="./Register"
                  className="block w-full px-5 py-3 text-sm text-center font-medium text-white bg-gray-900 hover:bg-gray-800"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                 Register
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="text-center">
            <div className="sm:text-center md:max-w-6xl md:mx-auto lg:col-span-6 lg:text-center">
              <h1>
                <span style={{fontFamily: 'Space Grotesk, sans-serif'}} className="font-bold mt-1 block text-4xl tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="text-white ">Your cybersecurity journey <span className="text-blue-600">starts here</span></span>
                  
                </span>
              </h1>
              <p style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                   The learning platform made for cybersecurity enthusiasts.

              </p>
              <div style={{fontFamily: 'Space Grotesk, sans-serif'}} className="hidden mt-8 sm:max-w-lg sm:mx-auto  sm:text-center lg:text-center lg:mx-auto">
        
                  <Link
                    style={{cursor:'pointer'}}
                    type="submit"
                    to="./register"
                    className="mt-4 w-full px-10 py-4 border border-2  text-base font-medium rounded-md text-white bg-blue-600 border-blue-600 border-2 text-xl shadow-sm hover:bg-blue-700  hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                    Create an account
                  </Link>

                  <Link
                    to="./Login"
                    type="submit"
                    className="lg:ml-2 md:ml-2 mt-4 w-full px-10 py-4 border border-2  text-base font-medium rounded-md text-white bg-gray-800 border-gray-700 border-2 text-xl shadow-sm hover:bg-gray-900  hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                     Login
                  </Link>
            
              </div>
    <br></br>
              <Link to="#"  onClick={() => {
                        document.getElementById("video").classList.remove("hidden");
        }}  className="mt-10 sm:text-center  md:mx-auto  text-blue-500 lg:text-center lg:mx-auto "><i class="fas fa-play"></i> Watch Video</Link>
            </div>
          
          </div>
        </main>
      </div>


      <div style={{fontFamily: 'Space Grotesk, sans-serif'}}  className="relative bg-black pt-5 pb-32 overflow-hidden">
      <div  style={{fontFamily: 'Space Grotesk, sans-serif'}}  className="relative">
        <div className="lg:mx-auto lg:max-w-auto lg:px-8  ">
 
          
    
    
        <div className="mx-auto  ">

        <Features/>

</div>
</div>
</div>
        



<div id="video" className="hidden fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
   
    <div onClick={() => {
                        document.getElementById("video").classList.add("hidden");
        }}  className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity" aria-hidden="true"></div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

 
    <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
      <div>
    
        <div className="mt-3 text-center sm:mt-5">
       <iframe width="720" height="400" src="https://www.youtube-nocookie.com/embed/HrerCAcOblc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; hide-info;"></iframe>
        <button  onClick={() => {
                        document.getElementById("video").classList.add("hidden");
        }} class="mt-4 bg-black px-4 rounded-lg text-white hover:bg-gray-800">X Close</button> 
        </div>
        
      </div>
  
    </div>
  </div>
</div>

      


          

      
   
      <div className="bg-black">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-10 lg:py-16 lg:pr-0 xl:py-20 xl:px-10">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
             
                <span className="block">Start a CTFGuide Chapter for your school</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-blue-200">
                Want to start a community of hackers? CTFGuide is the perfect platform for you. We've got all the tools to get you started.
              </p>
              <Link
                to="#"
                className="mt-8  border bg-gray-800 border-gray-700 rounded-md shadow px-10 py-3 inline-flex items-center text-base font-medium text-white"
              >
                Coming Soon
              </Link>
            </div>
          </div>
     
        </div>
      </div>
    </div>

    <p className="mt-4 text-gray-500 py-6 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/terms-of-service.md">Terms of Service</a> • <a className="hover:text-white" href="https://github.com/ctfguide-tech/Information/blob/main/privacy-policy.md">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

  
  
    </div>


    
    </div>



  )
}

  
export default Home;