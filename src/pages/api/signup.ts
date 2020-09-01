import {NextApiRequest, NextApiResponse} from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite"
import { hash } from "bcrypt";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json("Sorry we only allow POST method")
  }
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json("Update data should contain name ,email and password");
  hash(password, 10, async (_: any, hashValue: string) => {
    const statement = await db.prepare('INSERT INTO person (name, email, password) values (?, ?, ?)');
    await statement.run(name, email, hashValue);
    const people = await db.all('SELECT id, email, name FROM person');
    return res.json(people);
  })

}