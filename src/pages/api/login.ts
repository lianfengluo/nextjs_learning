import {NextApiRequest, NextApiResponse} from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite"
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json("Sorry we only allow POST method")
  }
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json("Login require email and password");
  const person = await db.get('SELECT * FROM person where email = ?', [email]);
  if (!person) {
    return res.status(401).json("Incorrect email or password");
  }
  compare(password, person.password, (err: Error, result: boolean) => {
    if (!err && result) {
      const claims =  { sub: person.id, personName: person.name };
      const jwt = sign(claims, process.env.JWT_SECRET || "jwt-secret", {expiresIn: "365d"});
      return res.json({authToken: jwt})
    } else {
      return res.status(401).json("Incorrect email or password");
    }
  })
}