

import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

export function RoleAsk() {
    return (
        <>

            <div className='flex justify-center items-center h-screen'>
                <Container style={{ backgroundColor: "#161716" }} className=" ">

                    <h1 className='text-white text-xl  text-center'>Onboarding</h1>
   
                    <div style={{ backgroundColor: "#161716" }} className='max-w-6xl mt-4 mx-auto'>

                        <div className="my-auto mx-auto px-4  text-center">
                            <h1 className='text-white text-3xl font-semibold'> What's your role? </h1>
                            <div className='grid grid-cols-2 gap-4 mt-4'>

                                <button className='flex flex-col justify-center items-center border px-14 py-3 bg-blue-900 hover:bg-blue-800 border-blue-600 rounded-lg'>
                                    <h1 className='text-2xl text-white'>Educator</h1>
                                </button>

                                <button className='flex flex-col justify-center items-center border px-14 py-3 bg-green-900 hover:bg-green-800 border-green-600 rounded-lg'>
                                    <h1 className='text-2xl text-white'>Individual</h1>
                                </button>

                              

                       

                            </div>

  <div className="mt-10 w-full bg-blue-900 rounded-full  ">
    <div className="bg-blue-700 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: "50%"}}> 50%</div>
  </div>


                        </div>
                    </div>









                </Container>
            </div>
        </>
    )
}
