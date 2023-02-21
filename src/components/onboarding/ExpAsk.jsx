
/*


    2/4 User Experience
  


*/
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

export function ExpAsk() {
    return (
        <>

            <div className='flex justify-center items-center h-screen'>
                <Container style={{ backgroundColor: "#161716" }} className=" ">

                    <h1 className='text-white text-xl  text-center'>Onboarding</h1>
   
                    <div style={{ backgroundColor: "#161716" }} className='max-w-6xl mt-4 mx-auto'>

                        <div className="my-auto mx-auto px-4  text-center">
                            <h1 className='text-white text-3xl font-semibold'> What's your experience with cybersecurity? </h1>
                            <div className='grid grid-cols-4 gap-4 mt-4'>

                                <button className='flex flex-col justify-center items-center border px-14 py-3 bg-blue-900 hover:bg-blue-800 border-blue-600 rounded-lg'>
                                    <h1 className='text text-white'>No experience</h1>
                                </button>

                                <button className='flex flex-col justify-center items-center border py-3 bg-green-900 hover:bg-green-800 border-green-600 rounded-lg'>
                                    <h1 className='text text-white'>I've done some programming, but not much cybersecurity.</h1>
                                </button>

                              

                       
                                <button className='flex flex-col justify-center items-center border px-6 py-3 bg-red-900 hover:bg-red-800 border-red-600 rounded-lg'>
                                    <h1 className='text text-white'>I've done some CTF competitions before.</h1>
                                </button>

                                <button className='flex flex-col justify-center items-center border py-3 bg-yellow-900 hover:bg-yellow-800 border-yellow-600 rounded-lg'>
                                    <h1 className='text text-white'>I've exploited production software before. I'm looking to fine-tune my skills.</h1>
                                </button>


                            </div>

  <div className="mt-10 w-full bg-blue-900 rounded-full  ">
    <div className="bg-blue-700 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: "45%"}}> 25%</div>
  </div>


                        </div>
                    </div>









                </Container>
            </div>
        </>
    )
}
