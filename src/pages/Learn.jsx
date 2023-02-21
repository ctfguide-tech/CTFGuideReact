import Head from 'next/head'


import { Footer } from '@/components/Footer'

import { StandardNav } from '@/components/StandardNav'
import { LearnCore } from '@/components/LearnCore'
export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Learn - CTFGuide</title>
        <meta
          name="description"
          content="Cybersecurity made easy for everyone"
        />
                <style>
          @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
        </style>
      </Head>


      <main>
      
        <LearnCore/>
      </main>
     
    </>
  )
}
