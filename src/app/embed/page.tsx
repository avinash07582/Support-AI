import { getSession } from '@/lib/getSession'

import EmbedClient from '../Components/EmbedClient'

const page = async () => {

    const session =  await getSession()
  return (
    <>

       <EmbedClient 
        ownerId={session?.user?.id ?? "" }
       />
    </>
  )
}

export default page