import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeInSection } from '../functions/styling/FadeInSection'

export function Hero() {


  return (
    
    <Container style={{fontFamily: 'Poppins, sans-serif'}}  className="bg-blend-darken  mx-auto max-w-7xl mt-20">
 <h1 className="font-medium drop-shadow-3xl mx-auto mx-auto text-center font-display lg:text-5xl text-3xl tracking-tight text-white text-wrap ">
 An ethical hacking, learning, and competition platform for students and professionals alike.

      </h1>
<div className='mx-auto text-center'>

<button className='rounded-sm mt-8 px-6 py-2 mt-4 text-xl bg-blue-600 text-white font-semibold rounded-sm'>Join the beta!</button>
  </div>


  <div className='mx-auto mt-20 '>
      <img src="./preview.png" className="floating mx-auto text-center  w-6/7." ></img>
  </div>
      </Container>

    
  )
}
