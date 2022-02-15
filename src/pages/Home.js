import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { SparklesIcon, LightningBoltIcon } from '@heroicons/react/outline'


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
                <a href="#">
                  <span className="sr-only">CTFGuide</span>
                 
                  <div className="flex-shrink-0 flex items-center">
				
                <img src="./CTFGuide trans dark.png" width="70"/> <span style={{fontFamily: 'Space Grotesk, sans-serif'}} className="w-auto font-semibold text-3xl text-white">CTFGuide</span>
                </div>


                </a>
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
                  to="./login"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  className="inline-flex items-center px-4 py-2 border border-2 border-blue-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                >
                  Log in
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
                <a href="#">
                  <span className="sr-only">CTFGuide</span>
                 
                  <div className="flex-shrink-0 flex items-center">
				
                <img src="./CTFGuide trans dark.png" class="w-10"/> <span style={{fontFamily: 'Space Grotesk, sans-serif'}} className="w-auto font-semibold text-xl text-white">CTFGuide</span>
                </div>


                </a>
                  <div className="-mr-2">
                    <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
               
                <Link
                  to="./Login"
                  className="block w-full px-5 py-3 text-sm text-center font-medium text-white bg-gray-900 hover:bg-gray-800 mt-4"
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
              <div style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mt-8 sm:max-w-lg sm:mx-auto  sm:text-center lg:text-center lg:mx-auto">
        
                  <a
                    type="submit"
                    className="mt-4 w-full px-10 py-4 border border-2  text-base font-medium rounded-md text-white bg-blue-600 border-blue-600 border-2 text-xl shadow-sm hover:bg-blue-700  hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                    Create an account
                  </a> 

                  <a
                    href="./Login"
                    type="submit"
                    className="ml-2 mt-4 w-full px-10 py-4 border border-2  text-base font-medium rounded-md text-white bg-gray-900 border-gray-800 border-2 text-xl shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                     Login
                  </a>
            
              </div>
    <br></br>
              <a href="#" className="mt-10 sm:text-center  md:mx-auto  text-blue-500 lg:text-center lg:mx-auto "><i class="fas fa-play"></i> Watch Video</a>
            </div>
          
          </div>
        </main>
      </div>


      <div style={{fontFamily: 'Space Grotesk, sans-serif'}}  className="relative bg-black pt-5 pb-32 overflow-hidden">
      <div  style={{fontFamily: 'Space Grotesk, sans-serif'}}  className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          
        <div className="relative">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-600">
                  <LightningBoltIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                 Loads of resources
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                Loads of community uploaded challenges from varying difficulties for you to practice. All these challenges have extensive write-ups, so you'll never be alone when you're stuck on a challenge.
                </p>
               
              </div>
            </div>
      
          </div>

          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-600">
                <i class="fas fa-terminal text-white"></i>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Integrated Terminal
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                The terminal is integrated directly onto the website, meaning you can run linux commands from the comfort of your browser.
                </p>
               
              </div>
            </div>
      
          </div>

          </div>

          
    


            <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-600">
                  <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                 An engaging learning experience
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                CTFGuide keeps you engaged by introducing a competitive factor. Solving challenges awards points and the amount of points you have determines what rank you are.
                </p>
               
              </div>
            </div>
      
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
         
            </div>
          </div>
        







            </div>

            <div className="mt-6 px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-600">
                <i class="fas fa-brain text-white text-xl"></i>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  ML Powered Learning
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                Get lessons tailored to your skillset. CTFGuide uses machine learning to generate lessons based of your past performance on activites.
                </p>
               
              </div>
            </div>
      
          </div>


          
          </div>

          

          
        </div>
      </div>

   
   
    </div>
    </div>



  )
}

  
export default Home;