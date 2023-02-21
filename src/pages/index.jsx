import { Fragment } from 'next'
import { Popover, Transition } from '@headlessui/react'

import { Link } from "next/link";
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Footer } from '../components/Footer'
import { FeaturesPanel } from '@/components/home/FeaturesPanel';
import { Container } from '@/components/Container';
const navigation = [

 
]


const transferFeatures = [
  {
    id: 1,
    name: 'Community Uploaded Challenges',
    description:

      'Get access to hunderds of challenges uploaded by the community. You can also upload your own challenges. ',

  },
  {
    id: 2,
    name: 'Competitive System',
    description:

      'All challenges are ranked by difficulty, and you can compete with other users to solve them. ',

  },

]




export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div style={{fontFamily: "Poppins, sans-serif"}}>
      <FeaturesPanel></FeaturesPanel>
    <Footer></Footer>
    </div>
  )
}

  
