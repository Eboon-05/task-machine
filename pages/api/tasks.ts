import type { NextApiRequest, NextApiResponse } from 'next'

import { clientPromise } from 'db/client'
import { ObjectId } from 'mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('here')

    try {
        const client = await clientPromise

        const db = client.db('tasks')

        const user = await db.collection('users').findOne({
            _id: new ObjectId('63823713c62c559dda97ceb9'),
        })

        console.log('User =>', user)

        // res.json(user.tasks)
    } catch (e) {
        console.error(e)
    }
    // res.status(200).json({ name: 'John Doe' })
}

export default handler
