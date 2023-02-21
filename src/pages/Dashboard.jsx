import Head from 'next/head'

import { Footer } from '@/components/Footer'

import { StandardNav } from '@/components/StandardNav'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Stats } from '@/components/dashboard/Stats'
import { Developer } from '@/components/dashboard/Developer'
import { useEffect } from 'react'
export default function Dashboard() {

      /*
      Code to check if onboarding has been complete
    */
    useEffect(() => {
      fetch("api.ctfguide.com/dashboard")
        .then((res) => res.json())

        .then((data) => {
          if (data.onboardingComplete == false) {
      //      window.location.replace("http://localhost:3000/onboarding?part=1")
          }
        }
        )
    //  .catch((error) => window.location.replace("http://localhost:3000/onboarding?part=1"))
    })

  return (



    <>
      <Head>
        <title>Dashboard - CTFGuide</title>
        <meta
          name="description"
          content="Cybersecurity made easy for everyone"
        />
        <style>
          @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
        </style>
      </Head>
      <StandardNav />
      <main>
        <DashboardHeader />
        <Stats />
        <div className="max-w-6xl mx-auto w-full px-9">

          <h1 className="text-xl text-white tracking-tight mt-2  mb-2  " style={{ color: "#595959" }}> PLATFORM  FEED</h1>

          <div
            style={{ backgroundColor: "#212121" }}
            className="rounded-lg mb-16  px-6 py-5 shadow-sm    hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >

            <h1 className="text-white text-xl">CTFGuide Winter Competition</h1>

            <p className="text-white mt-2" style={{ color: "#8c8c8c" }}>
              The CTFGuide Winter Competition is now live! Compete against other CTFGuide users to win prizes and earn points. The competition ends on January 1st, 2023. Join the competition by clicking this link: https://comp.ctfguide.com/2.
            </p>


            <p className="mt-4 text-sm italic" style={{ color: "#8c8c8c" }}>Posted by CTFGuide Team - 12/21/22</p>

          </div>
        </div>

    <Developer></Developer>
      </main>
      <Footer />
    </>
  )
}
