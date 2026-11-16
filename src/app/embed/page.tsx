
import { getSession } from '@/lib/getSession'
import EmbedClient from '../Components/EmbedClient'
import { Suspense } from 'react'

const EmbedContent = async () => {
    const session = await getSession()

    return (
        <EmbedClient
            ownerId={session?.user?.id ?? ""}
        />
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div>Loading embed...</div>}>
            <EmbedContent />
        </Suspense>
    )
}

export default Page
