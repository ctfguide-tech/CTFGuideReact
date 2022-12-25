import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Menu, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { SparklesIcon, LightningBoltIcon } from '@heroicons/react/outline'
import { Features } from '../components/features';
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

const navigation = [
  { name: 'Mission', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Outreach', href: '#' },
  { name: 'Careers', href: '#' },
]

const transferFeatures = [
  {
    id: 1,
    name: 'Community Uploaded Challenges',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    id: 2,
    name: 'Competitive System',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },

]
const communicationFeatures = [
  {
    id: 1,
    name: 'Terminal',
    description:
      'Get access to your very own cloud VM running Linux. Use it to solve challenges, or just to practice your skills.',
  },
  {
    id: 2,
    name: 'Backed by AWS',
    description:
      'Our infrastructure is backed by Amazon Web Services, so you can be sure that your data is safe and secure.',
  },
]

const Home = () => {

  document.title = "CTFGuide"

  

  /*
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
                  className="inline-flex items-center px-10 py-2 border borde border-gray-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-white hover:border-gray-700"
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
                  className="block w-full px-5 py-3 text-sm text-center font-medium text-white bg-white hover:bg-gray-800  mt-4"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  Log in
                </Link>
                <Link
                  to="./Register"
                  className="block w-full px-5 py-3 text-sm text-center font-medium text-white bg-white hover:bg-gray-800"
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
                    className="mt-4 w-full px-10 py-4 border border-2  text-base font-medium rounded-md text-white bg-blue-600 border-blue-600 border-2 text-xl shadow-sm hover:bg-blue-700  hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:mt-0  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                    Create an account
                  </Link>

                  <Link
                    to="./Login"
                    type="submit"
                    className="lg:ml-2 md:ml-2 mt-4 w-full px-10 py-4 border border-2  text-base font-medium rounded-md text-white bg-gray-800 border-gray-700 border-2 text-xl shadow-sm hover:bg-white  hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:mt-0  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                     Login
                  </Link>
            
              </div>
    <br></br>
              <Link to="#"  onClick={() => {
                        document.getElementById("video").classList.remove("hidden");
        }}  className="mt-10 sm:text-center  md:mx-auto  text-blue-700 lg:text-center lg:mx-auto "><i class="fas fa-play"></i> Watch Video</Link>
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
        }}  className="fixed inset-0 bg-white bg-opacity-95 transition-opacity" aria-hidden="true"></div>

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
        <div className="bg-white border border-gray-800 rounded-lg shadow-xl overflow-hidden">
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
  */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="isolate" style={{fontFamily: 'Poppins, sans-serif'}}>
    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg
        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fillOpacity=".3"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0034e4" />
            <stop offset={1} stopColor="#000516" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="px-6 pt-6 lg:px-8 ">
      <div>
        <nav className="flex h-9 items-center justify-between" aria-label="Global">
          <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="#" className="-m-1.5 p-1.5 flex">
              <span className="sr-only">CTFGuide</span>
              <img
                                            className="h-14 w-14 zimg"
                                            src="../../CTFGuide trans dark.png"
                                            alt="CTFGuide"
                                        />
                                        <h1 className='text-white text-2xl my-auto'>CTFGuide</h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>


            </button>
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-semibold text-white hover:text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <Link
              to="./login"
              className="inline-block rounded-lg px-6 py-1.5 text-sm font-semibold leading-6 border text-white shadow-sm ring-1 ring-white/10 hover:ring-white/20"
            >
              Log in
            </Link>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex h-9 items-center justify-between">
              <div className="flex">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">CTFGuide</span>
                  <img
                    className="h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 text-white">
                <div className="space-y-2 py-6 text-white">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
    <main>
      <div className="relative px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div>
       
            <div>
              <h1 className="text-4xl text-white font-bold tracking-tight sm:text-center sm:text-6xl">
                Cybersecurity demystified.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-400 sm:text-center">
                A platform built for learning cybersecurity right from the browser.
              </p>
              <div className="mt-8 flex gap-x-4 sm:justify-center">
                <Link
                  to="./register"
                  className="inline-block rounded-lg border px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm"
                >
                  Create an account
                  <span className="text-white ml-2" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link
                  to="./login"
                  className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-white ring-1 ring-white/10 hover:ring-white/20"
                >
                  Returning user?
                  <span className="text-white ml-2" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0034e4" />
                    <stop offset={1} stopColor="#000516" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div className="overflow-hidden  py-16 lg:py-24">
      <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-1">
        <svg
          className="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-600" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div className="relative">
          <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
           We've got every aspect covered for you.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
                A seamless learning experience for every aspect of cybersecurity.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Capture the Flag</h3>
            <p className="mt-3 text-lg text-gray-500">
            Capture "flags" that are secretly hidden in purposefully-vulnerable programs or websites. It's the go-to format for cybersecurity competitions.
            </p>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0034e4" />
                    <stop offset={1} stopColor="#000516" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <dl className="mt-10 space-y-10">
              {transferFeatures.map((item) => (
                <div key={item.id} className="relative px-4 py-4 rounded-lg" style={{ backgroundColor: "#212121"}}>
                  <dt>
                   
                    <p className=" text-lg font-medium leading-6 text-white">{item.name}</p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{item.description}</dd>
                </div>
              ))}
            </dl>

            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0034e4" />
                    <stop offset={1} stopColor="#000516" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-600" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <img
              className="relative mx-auto shadow-2xl  shadow-gray-900/50  rounded-lg  "
              style={{borderColor: "black"}}
              width={2000}
              src="../ss4.png"
              alt=""
            />
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0034e4" />
                    <stop offset={1} stopColor="#000516" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            
          </div>
        </div>

        <svg
          className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-600" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
        </svg>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Built for the web</h3>
              <p className="mt-3 text-lg text-gray-500">
                Everything can be done right from your browser. No need to download or install anything.
              </p>

              <dl className="mt-10 space-y-10">
                {communicationFeatures.map((item) => (
                 <div key={item.id} className="relative px-4 py-4 rounded-lg" style={{ backgroundColor: "#212121"}}>
                  <dt>
                   
                    <p className=" text-lg font-medium leading-6 text-white">{item.name}</p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{item.description}</dd>
                </div>
                ))}

<div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0034e4" />
                    <stop offset={1} stopColor="#000516" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
              </dl>
            </div>

            <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(10%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0034e4" />
                    <stop offset={1} stopColor="#000516" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
              <svg
                className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={784} height={404} fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
              </svg>
              <img
                className=" relative mx-auto"
                width={1000}
                src="../ss5.png"
                alt=""
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
  )
}

  
export default Home;