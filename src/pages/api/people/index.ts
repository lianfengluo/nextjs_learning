import {NextApiRequest, NextApiResponse} from "next";
import { open } from 'sqlite'
import sqlite3 from "sqlite3";
import authenicate from "src/utils/authenicate";

export default authenicate(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(500).json("Sorry we only allow GET method")
  }
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  const people = await db.all('SELECT id, email, name FROM person');
  // console.log('ALL PEOPLE', JSON.stringify(people, null, 2));
  return res.json(people)
})