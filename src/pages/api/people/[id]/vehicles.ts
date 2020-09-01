import {NextApiRequest, NextApiResponse} from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite"
import authenicate from "src/utils/authenicate";

export default authenicate(async function getAllVehicleByPersonId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(500).json("Sorry we only allow GET method")
  }
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  const vehicles = await db.all('SELECT * FROM vehicle where ownerId = ?', [req.query.id]);
  return res.json(vehicles)
})