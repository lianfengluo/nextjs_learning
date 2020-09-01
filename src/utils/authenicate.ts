import { NextApiResponse, NextApiHandler } from 'next';
import { NextApiRequest } from 'next';
import { verify, VerifyErrors } from 'jsonwebtoken';

const authenicate = (fn: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.headers.authorization || "", process.env.JWT_SECRET || "jwt-secret", async( err: VerifyErrors | null, decoded: object | undefined) => {
    if (!err && decoded) {
      return await fn(req, res)
    }
    res.status(403).json({"message": "You are not authenicated."})
  })
}

export default authenicate;