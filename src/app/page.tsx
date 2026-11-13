import React from 'react'
import HomeClient from './Components/HomeClient'
import { getSession } from '@/lib/getSession'

const Home = async () => {

  const session = await  getSession()
  console.log(session);
  
  return (
    <div>
    <HomeClient email={session?.user?.email ?? ""} />
    </div>
  )
}

export default Home