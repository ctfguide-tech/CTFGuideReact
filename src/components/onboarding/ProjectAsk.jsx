/*

  3/4 Project Experience


*/

import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

export function ProjectAsk() {
    return (
        <>

            <div className='flex justify-center items-center h-screen'>
                <Container style={{ backgroundColor: "#161716" }} className=" ">

                    <h1 className='text-white text-xl  text-center'>Onboarding</h1>
   
                    <div style={{ backgroundColor: "#161716" }} className='max-w-6xl mt-4 mx-auto'>

                        <div className="my-auto mx-auto px-4  text-center">
                            <h1 className='text-white text-3xl font-semibold'> Let's fine-tune your learning flow. </h1>
                            <div className='grid grid-cols-2 gap-10 mt-4'>

                                    <div className='mx-auto text-center w-full'>
                                        <h1 className='text-white text-xl'>Upload your portfolio and write-ups.</h1>
                                        <div className="flex items-center justify-center w-full mt-4">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-30border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800  border-gray-800 border  dark:border-gray-600 ">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
</div> 

                                    </div>


                                    <div className='border-l-4  px-4 py-1 border-blue-800'>

                                            <h1 className='text-left text-white text-xl font-semibold'>Why are we asking this?</h1>
                                            <p className='text-white text-left'>We use artificial intelligence to analyze your write-ups & projects to better understand your interests and personalize your learning experience based of this data.</p>


                                            <h1 className='text-left text-white text-xl font-semibold mt-4'>Do we store these files?</h1>
                                            <p className='text-white text-left'>Nope, we temporarily store them to analyze and then delete it immediately afterward..</p>

                                    </div>
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
