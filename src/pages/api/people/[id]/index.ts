import {NextApiRequest, NextApiResponse} from "next";

export default function getPeopleById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(500).json("Sorry we only allow GET method")
  }
  return res.json({id: req.query.id, message: "get people by id."})
}