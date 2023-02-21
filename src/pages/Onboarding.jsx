import Head from 'next/head'

import { Footer } from '@/components/Footer'

import { StandardNav } from '@/components/StandardNav'
import { Container } from '@/components/Container'

import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default function Onboarding() {
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
      <main>
        
        <div className="h-flex items-center justify-center h-screen">
           <OnboardingFlow></OnboardingFlow>
        </div>
   
      </main>
    </>
  )
}
