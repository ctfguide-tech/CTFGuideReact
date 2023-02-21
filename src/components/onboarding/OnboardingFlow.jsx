
/*


    2/4 User Experience
  


*/
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

// Components to offload and load dynamically
import { RoleAsk } from '@/components/onboarding/RoleAsk'
import { ExpAsk } from '@/components/onboarding/ExpAsk'
import { ProjectAsk } from '@/components/onboarding/ProjectAsk'
import { DataAsk } from '@/components/onboarding/DataAsk'
import { useState, useEffect } from 'react'
import { DataAskPart2 } from '@/components/onboarding/DataAskPart2'
import { Demo } from '@/components/onboarding/Demo'
import { useRouter } from 'next/router'


export function OnboardingFlow() {
    const router = useRouter()

    const [flowState, setFlowState] = useState(router.query.part || '1');
    
    useEffect(() => {
        setFlowState(router.query.part);
    }, [router.query.part]);

   // Read part from URL query parameter
 

    if (flowState === "1") {
        return <DataAsk />
    } else if (flowState === "2") {
        return <DataAskPart2 />
    } else if (flowState === "3") {
        return <Demo />
    } else {
        return <DataAsk/>
    }
}
