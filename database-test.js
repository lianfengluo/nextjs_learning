import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function setUp() {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  await db.migrate({ force: 'last' });

  const people = await db.all('SELECT * FROM person');
  console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

  const vehicles = await db.all('SELECT * FROM vehicle');
  console.log('ALL VEHICLES', JSON.stringify(vehicles, null, 2));
}

setUp();
