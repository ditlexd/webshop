import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.query;

    // TODO: Actually talk to server

    res.status(201).end();
}
