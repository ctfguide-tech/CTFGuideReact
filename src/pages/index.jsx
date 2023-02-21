import Head from 'next/head'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Hero } from '@/components/home/Hero'
import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { AboutPanel } from '@/components/home/AboutPanel'
import { FeaturesPanel } from '@/components/home/FeaturesPanel' 
import { Stats } from '@/components/home/Stats'
import { Dialog } from '@headlessui/react'


export default function Home() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>

      <Head>
        <title>CTFGuide</title>
        <meta
          name="description"
          content="Cybersecurity as a service."
        />
        <style>
          @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
        </style>
        
      </Head>
      <div className="isolate " style={{fontFamily: 'Poppins, sans-serif'}}>
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
                                            src="../../darkLogo.png"
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
   



          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <Link
              href="./login"
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
    <main >
      <div className=" px-6 lg:px-8 flex h-screen" style={{height: "100vh"}}>
        <div className="mx-auto my-auto max-w-3xl pt-10 pb-32 sm:pt-20 sm:pb-40 animate__animated animate__fadeIn">

          <div>
       
            <div>
              <h1 className="mx-auto my-auto text-4xl text-white font-bold tracking-tight sm:text-center sm:text-6xl">
                Cybersecurity demystified.
              </h1>
              <p className="mx-auto my-auto mt-6 text-lg leading-8 text-gray-400 sm:text-center">
                A platform built for learning cybersecurity right from the browser.
              </p>
              <div className="mt-8 flex gap-x-4 sm:justify-center">
                <Link
                  href="./register"
                  className="inline-block rounded-lg border px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm"
                >
                  Create an account
                  <span className="text-white ml-2" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href="./login"
                  className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-white ring-1 ring-white/10 hover:ring-white/20"
                >
                  Returning user?
                  <span className="text-white ml-2" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
            <div className="truncate absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">

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

    <FeaturesPanel></FeaturesPanel>

  </div>


      <Footer/>
    </>
  )
}
