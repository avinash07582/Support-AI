// import { getSession } from '@/lib/getSession'
// import React from 'react'
// import DashboardClient from '../Components/DashboardClient'

// const page = async() => {

//     const session = await getSession()

//   return (
//     <div>   <DashboardClient
//     ownerId={session?.user?.id ?? "" }
    
//     ></DashboardClient> </div>
//   )
// }

// export default page


import { getSession } from '@/lib/getSession'
import React, { Suspense } from 'react'
import DashboardClient from '../Components/DashboardClient'

const DashboardContent = async () => {
    const session = await getSession()

    return (
        <DashboardClient
            ownerId={session?.user?.id ?? ""}
        />
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    )
}

export default Page
