import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { useState } from 'react'

export function Demo() {

    const [navbarOpen, setNavbarOpen] = useState(false);    


    return (
        
        <div style={{}} className="h-full mx-auto py-2  w-full">

       
    <ul className='text-white flex gap-4 px-4 my-auto'>
    <li className='font-semibold my-auto'><img width="40" src="./darkLogo.png"></img></li>
    <li className='font-semibold my-auto'>Onboarding</li>

    <div className='ml-auto my-auto flex'>
        <li className='my-auto mr-4'>Logged in as Pranav</li>
        <img src="./default.png" width="30" className='my-auto'></img>
        </div>
    </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0  mt-2 h-100   resize-x">
                <div style={{backgroundColor: "#212121"}} className="px-4 py-4 h-100 resize-x">
                <iframe width="560" height="315" className='mx-auto' src="https://www.youtube.com/embed/HrerCAcOblc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
             

                    <h1 className='mt-4 text-xl text-white font-semibold'>Logging into your terminal.</h1>
                    <p className='text-white'>The black box to the right is your terminal. You can login to it using the following credentials:</p>
                    <div className='bg-black text-white p-4 mt-4' style={{fontFamily: "Arial"}}>
                        <p>ctfguide login: <span className='text-yellow-400'>e4</span></p>
                        <p>Password: <span className='text-yellow-400'>e4</span></p>
                    </div>


                    <h1 className='mt-4 text-xl text-white font-semibold'>Let's explore your terminal!</h1>
                    <p className='text-white'>You'll notice that there seems to be no user interface for this operating system. That's because you need to run commands to use this OS. Let's run a command to see what files are in our computer. </p>
                    <div className='bg-black text-white p-4 mt-4' style={{fontFamily: "Arial"}}>
                        <p>undefined@ctfguide:~$ <span className='text-yellow-400'>ls</span></p>
                    </div>


                    <h1 className='mt-4 text-xl text-white font-semibold'>Have a question?</h1>
                    <textarea  style={{backgroundColor:"#161716"}} className='h-1/4 mt-2 w-full bg-black text-white border-none text-white'>
                            We'll use machine learning to answer your question.
                      
                            For example:
                           "Why is their new UI"?

                            You can also ask us to simply the wording in this lesson. For example: "I don't get the second paragraph, can you simplify it?"

                    </textarea>

 
                    <button className='mt-4 bg-blue-700 text-white px-2 py-1 rounded-lg '>Waiting...</button>
                    <button className='ml-2 mt-4 text-white px-3 py-1 rounded-lg '>Skip</button>

                </div>
                <div className='h-screen bg-black overflow-hidden resize-x'>
                <div className='text-white bg-black text-sm flex'>
                    <p className='px-2 py-1'><span className='text-red-500'>◉</span> Not Connected to sandbox.ctfguide.com</p>
                    <div className='ml-auto px-2 py-1 flex'>
                        <p>⏳ Unlimited</p>
                    </div>
                    </div>
                <iframe id="terminal" className="w-full" height="500" src="https://terminal.ctfguide.com/wetty/ssh/root?2"></iframe>
              
                </div>
                
                <div style={{backgroundColor: "#212121"}} className="px-4 py-4 hidden">
                    <h1 className="text-2xl font-bold text-white">Developer Tools</h1>
                 
          
                    <p className='text-white'>Terminal Keylogger</p>
                    <textarea id="logger" className='w-full bg-black mt-4 text-blue-500'>
                            ctfguide login:
                    </textarea>

                    <p className='text-white'>External Testing Client</p>
                    <textarea id="logger" className='w-full bg-black mt-4 text-blue-500'>
                            ctfguide login:
                    </textarea>
                    
                
                </div>



                </div>
                <div className="bg-gray-900 text-sm border border-gray-600 text-white px-2 py-2 w-56"  style={{position: "fixed", zIndex: 1, marginTop: "500px", left: 900, top: -370}}>
                    <h1>
                        Type your username (e4) above.
                        <br></br>
                        <span className='text-white' style={{fontSize: ".8rem"}}>✅ Mark as complete</span>
                    </h1>
            </div>
            
        </div>
    )

}