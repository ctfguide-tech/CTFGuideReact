import Head from 'next/head'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { Alert } from '@/components/Alert'
import { Container } from '@/components/Container'
import { StandardNav } from '@/components/StandardNav'

export default function Pratice() {

    

    function loadChallenges() {
        fetch('https://api.ctfguide.com/challenges/type/all')
            .then(response => response.json())
            .then(data => {
                console.log(data)  

                for ( var i = 0; i < data.length; i++ ) {
                var difficultyColor = "border-green-500";
                
                if (data[i].difficulty == "easy") {
                    difficultyColor = "border-green-500";
                } else if (data[i].difficulty == "medium") {
                    difficultyColor = "border-yellow-500";
                } else if (data[i].difficulty == "hard") {
                    difficultyColor = "border-red-500";
                }

                document.getElementById("starter").insertAdjacentHTML('afterend', `<div class='card rounded-lg px-4 py-2 w-full border-l-4 ${difficultyColor}' style='background-color: #212121'>
                <h1 class='text-white text-2xl'>${data[i].title}</h1>
                <p class='text-white truncate'>${data[i].problem.substring(0, 40)}</p>
                <div class='flex mt-2'>

                    <p class='text-white px-2  rounded-lg bg-blue-900 text-sm'>${data[i].category}</p>
                </div>
            </div>`)
                }
            })
            .catch(error => {
                window.alert(error)
        });

        


    }

    loadChallenges();

    return (

    
        <>

            <Head>
                <title>Practice  - CTFGuide</title>
                <style>
                    @import url(&apos;https://fonts.googleapis.com/css2?family=Poppins&display=swap&apos;);
                </style>
            </Head>


            <StandardNav />

            <main>

                <div className=" w-full " style={{ backgroundColor: "#212121" }}>

                    <div className="flex mx-auto text-center h-28 my-auto">
                        <h1 className='text-4xl text-white mx-auto my-auto font-semibold'>Practice</h1>
                    </div>


                </div>

                <div className="flex max-w-6xl mx-auto mt-10">

                    <div className="w-2/3  max-w-xs flex-row-reverse">
                        <label for="difficulty" className="block text-sm leading-5 font-medium text-gray-200">Difficulty</label>
                        <select style={{ backgroundColor: "#212121" }} id="difficulty" className="mt-1 border-none text-white rounded  block w-full pr-40 pl-3 pr-10 py-2 text-base leading-6  focus:outline-none sm:text-sm sm:leading-5">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            <option disabled="">Custom</option>

                        </select>

                    </div>
                    <div className="ml-10 w-full">
                        <label for="difficulty" className="block text-sm leading-5 font-medium text-gray-200">Search</label>

                        <input id="search" style={{ backgroundColor: "#212121" }} onchange="search()" placeholder="Search for a Challenge" className="mt-1  rounded text-black block w-full pr-40 pl-3 pr-10 py-2 text-base leading-6  focus:outline-none sm:text-sm sm:leading-5"></input>
                    </div>
                </div>


                <div className='max-w-6xl mx-auto text-left mt-6'>
                    <h1 className='text-white text-3xl font-semibold'> 🔥 Popular </h1>
                    <div className="grid grid-cols-4 gap-4 gap-y-6 mt-4">


                        <div id="starter" className='hidden card rounded-lg px-4 py-2 w-full border-l-4 border-green-500' style={{ backgroundColor: "#212121" }}>
                            <h1 className='text-white text-2xl'>Scrambled Eggs</h1>
                            <p className='text-white'>Decrypt my breakfast please</p>
                            <div className='flex mt-2'>

                                <p className='text-white px-2  rounded-lg bg-blue-900 text-sm'>decryption</p>
                                <p className='ml-2 text-white px-2 rounded-lg bg-blue-900 text-sm'>cryptography</p>
                            </div>
                        </div>



                        </div>
                </div>

                <hr className='max-w-4xl mx-auto mt-10 border-slate-800'></hr>

                <div className='max-w-6xl mx-auto text-left mt-6'>
                    <h1 className='text-white text-3xl font-semibold'> 📦  Recently Created </h1>
                    <div className="grid grid-cols-4 gap-4 gap-y-6 mt-4"></div>
                </div>


            </main>



        </>
    )
}
