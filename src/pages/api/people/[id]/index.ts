import authenicate from 'src/utils/authenicate';
import {NextApiRequest, NextApiResponse} from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite"

export default authenicate(async function getPeopleById(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== "GET") {
  //   return res.status(500).json("Sorry we only allow GET method")
  // }
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  if (req.method === 'PUT') {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json("Update data should contain name and email");
    const statement = await db.prepare('UPDATE person SET name = ?, email = ? where id = ?');
    await statement.run(name, email, req.query.id);
    return res.json(`Update user ${req.query.id} succeed`);
    // return res.json(result);
  }
  const person = await db.all('SELECT * FROM person where id = ?', [req.query.id]);
  return res.json(person)
})