
/*


    2/4 User Experience
  


*/
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
export function DataAsk() {

    function submitData() {
        // Data validation
        if (document.getElementById("username").value.length < 5) {
            document.getElementById("username").classList.remove("border-0")
            document.getElementById("username").classList.add("border")
            document.getElementById("username").classList.add("border-red-400")
        } 
        if (document.getElementById("fullname").value.length < 5) {
            document.getElementById("fullname").classList.remove("border-0")
            document.getElementById("fullname").classList.add("border")
            document.getElementById("fullname").classList.add("border-red-400")
        } 
        if (document.getElementById("jobtitle").value.length < 5) {
            document.getElementById("jobtitle").classList.remove("border-0")
            document.getElementById("jobtitle").classList.add("border")
            document.getElementById("jobtitle").classList.add("border-red-400")
        }

        // Generate JSON to send
        var data = {
            "username": document.getElementById("username").value,
            "fullname": document.getElementById("fullname").value,
            "jobtitle": document.getElementById("jobtitle").value
        }

        localStorage.setItem("tempData", data)
        window.location.href = "./onboarding?part=2"
    }



    return (
        <>


            <div className='flex justify-center items-center h-screen'>
                <Container style={{ backgroundColor: "#161716" }} className=" ">

                     <img src="../onboarding.png" width={60} className="mx-auto"></img>
                    <h1 className='text-white text-2xl mt-2 text-center font-semibold'>Onboarding</h1>
                    <hr style={{borderColor: "#212121"}} className='mt-4 ml-6 mr-6'></hr>

                    <div style={{ backgroundColor: "#161716" }} className='max-w-6xl mt-4 mx-auto'>

                        <div className="my-auto mx-auto px-4 ">
                    
                            <h1 className='text-white text-xl '> You seem new around here, tell us about yourself. </h1>
                            <div className=' mt-4'>
                                <div className="isolate -space-y-px rounded-md shadow-sm">
                                    <div style={{borderColor: "#212121"}}  className="relative rounded-md rounded-b-none border  px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-white">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="username"
                                            style={{backgroundColor: "#212121"}}
                                            className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500  focus:ring-0 sm:text-sm px-4"
                                            placeholder="This is what people on CTFGuide will know you as."
                                        />
                                    </div>
                                    <div style={{borderColor: "#212121"}}  className="relative rounded-md rounded-t-none rounded-b-none border  px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-white">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="fullname"
                                            style={{backgroundColor: "#212121"}}
                                            className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500  focus:ring-0 sm:text-sm px-4"
                                            placeholder="This is private to the public by default."
                                        />
                                    </div>
                                
                                    <div style={{borderColor: "#212121"}}  className="relative rounded-md rounded-t-none border px-3 py-2 focus-within:z-10 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                        <label htmlFor="job-title" className="block text-xs font-medium text-white">
                                            Job Title
                                        </label>
                                        <select
                                            style={{backgroundColor: "#212121"}}
                                            type="text"
                                            name="job-title"
                                            id="jobtitle"
                                            className="mt-2 py-1 rounded block w-full border-0 p-0 text-white placeholder-gray-500 focus:ring-0 sm:text-sm px-4"
                                            placeholder="Head of Tomfoolery"
                                        >
                                            <option>Student</option>
                                            <option>K-12 Teacher</option>
                                            <option>College Professor</option>
                                            <option>Employer</option>
                                            <option>Other</option>

                                        </select>
                                     
                                    </div>
                                </div>

                            <div className='mx-auto text-center mx-auto'>
                                <button onClick={submitData} className='button mt-8 w-2/3 mx-auto bg-blue-800 hover:bg-blue-900 text-white py-2 rounded'>Next Step</button>
                                </div>
                            </div>

                        


                        </div>
                    </div>









                </Container>
            </div>
        </>
    )
}
