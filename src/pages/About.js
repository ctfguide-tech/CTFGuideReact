import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Menu, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { SparklesIcon, LightningBoltIcon } from '@heroicons/react/outline'
import { Features } from '../components/features';
import { useState } from 'react'
import { Dialog } from '@headlessui/react'




const About = () => {
    const stats = [
        { label: 'Founded', value: '2021' },
        { label: 'Employees', value: '6' },
        { label: 'Beta Users', value: '521' },
        { label: 'Raised', value: '$7K' },
      ]


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
      <>
     

    
   <div className="relative " style={{fontFamily: "Poppins, sans-serif"}}>
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
          <div className="flex">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>


            </button>
          </div>
          <div className=" lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
          <a  href="../?view=features" className="font-semibold text-white hover:text-white">
               Home
              </a>

<a  href="./about" className="font-semibold text-white hover:text-white">
               About
              </a>


<a href="../"  style={{cursor: "pointer"}} className="font-semibold text-white hover:text-white">
               Features
              </a>

              <a href="https://ctfguide.freshteam.com/jobs" className="font-semibold text-white hover:text-white">
               Careers
              </a>


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


      <div className="lg:mx-auto  lg:max-w-7xl ">
     
        <div className="relative mx-auto max-w-md px-6 sm:max-w-4xl lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
           
               
            <h2 className="mt-12 text-4xl font-bold tracking-tight text-blue-600 ">
              "On a mission to educate the next generation of cybersecurity professionals."
            </h2>
            <div className="mt-12 space-y-6 text-gray-200">
              <p className="text-lg">
              Pranav Ramesh, a high school student, started a cybersecurity club in his school in 2019. He led the club to win multiple CTF competitions, including the University of Delaware Blue Hen CTF in 2020. Pranav believed in the importance of collaborative learning and created a cloud-based platform connecting standalone competitive hacking engines and problem banks for his club to use. The platform was successful and was adopted by cybersecurity enthusiasts and clubs at dozens of schools. <br></br><br></br>Raymond, a cloud infrastructure engineer, saw the potential for a cybersecurity equivalent to platforms like GitHub and Kaggle and joined the CTFGuide team to help achieve that goal. On October 31, 2022, CTFGuide received a grant from Amazon Web Services to aid in its development and research.



</p>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-10 mb-20">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                  <dt className="text-base font-medium text-gray-200">{stat.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">

            </div>
            <br></br>
            <br></br>

          </div>
        </div>
      </div>
    </div>
      </>
    )
    };
    
  export default About;