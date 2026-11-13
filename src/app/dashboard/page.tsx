import { getSession } from '@/lib/getSession'
import React from 'react'
import DashboardClient from '../Components/DashboardClient'

const page = async() => {

    const session = await getSession()

  return (
    <div>   <DashboardClient
    ownerId={session?.user?.id ?? "" }
    
    ></DashboardClient> </div>
  )
}

export default page