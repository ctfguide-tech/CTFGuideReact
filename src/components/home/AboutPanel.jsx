import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
export function AboutPanel() {
      const stats = [
            { label: 'Founded', value: '2020' },
            { label: 'Employees', value: '4' },
            { label: 'Beta Users', value: '521' },
            { label: 'Raised', value: '$10K' },
          ]

    return (
        <>
                <Container style={{ backgroundColor: "#161716" }} className="mt-40">
   <div className="lg:mx-auto  lg:max-w-7xl ">
     
        <div className="relative mx-auto max-w-7xl px-6 sm:max-w-6xl lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
           
               
            <h2 className="mt-12 text-4xl font-bold tracking-tight text-white ">
              "On a mission to educate the next generation of cybersecurity professionals."
            </h2>
            <div className="mt-12 space-y-6 text-gray-200">
              <p className="text-lg">
              Pranav Ramesh, a high school student, started a cybersecurity club in his school in 2019. He led the club to win multiple CTF competitions, including the University of Delaware Blue Hen CTF in 2020. Pranav believed in the importance of collaborative learning and created a cloud-based platform connecting standalone competitive hacking engines and problem banks for his club to use. The platform was successful and was adopted by cybersecurity enthusiasts and clubs at dozens of schools. <br></br><br></br>Raymond, a cloud infrastructure engineer, saw the potential for a cybersecurity equivalent to platforms like GitHub and Kaggle and joined the CTFGuide team to help achieve that goal. <br></br><br></br>On October 31, 2022, CTFGuide received a grant from Amazon Web Services to aid in its development and research.



</p>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-10 mb-20">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                  <dt className="text-base font-medium text-gray-200">{stat.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">

            </div>
            <br></br>
            <br></br>

          </div>
        </div>
      </div>
  
</Container>
        </>
    )
}