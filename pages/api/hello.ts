// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { signInUser } from '../../utilities/controller/UserController';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body) {
        console.log(req.body);
        return;
        const { email, password } = req.body;
        signInUser(email, password)
            .then(() => res.redirect(200, `/project_selection`))
            .catch(() => {
                res.status(400);
            });
    } else {
        res.status(500);
    }
};
