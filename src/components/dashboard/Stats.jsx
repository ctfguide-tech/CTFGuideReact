import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

export function Stats() {
    return (
        <>
            <Container style={{ backgroundColor: "#161716" }} className="py-10 max-w-6xl rounded-lg">
                <div style={{ backgroundColor: "#212121" }} className='mx-auto text-center grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-4 px-4 gap-4 rounded-lg'>
                    <div style={{ backgroundColor: "#161716" }}  className='px-4 py-4 mx-auto w-full stext-center text-white rounded-lg shadow-lg '>
                        <img className="mx-auto" width="50" src="./gold.png"></img>
                        <h1 className='text-xl mt-2 font-semibold'>League</h1>
                    </div>

                    <div style={{ backgroundColor: "#161716" }}  className='px-4 py-4 mx-auto w-full text-center text-white rounded-lg shadow-lg'>
                        <h1 className='text-4xl text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-yellow-900'>45th</h1>
                        <h1 className='text-xl font-semibold'>Rank</h1>
                    </div>

                    <div style={{ backgroundColor: "#161716" }}  className='px-4 py-4 mx-auto w-full text-center text-white rounded-lg shadow-lg'>
                    <h1 className='text-4xl'>4000</h1>

                        <h1 className='text-xl'>Points</h1>
                    </div>
                </div>

            </Container>
        </>
    )
}
