import {NextApiRequest, NextApiResponse} from "next";

export default function Vehicle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(500).json("Sorry we only allow GET method")
  }
  return res.json({api: "get vehicles."})
}