import { db } from '@infra/db/sqlite/helpers/sqlite-helper'
import { v4 as uuidv4 } from 'uuid'

export const setupDB = () => {
  db.serialize(() => {
    db.run(
      `
    CREATE TABLE cards (
      id varchar(255) UNIQUE PRIMARY KEY,
      titulo TEXT,
      conteudo TEXT,
      lista TEXT
      );
    `,
      (err: Error) => {
        if (err) {
          console.log('Some Error Occured')
        } else {
          console.log('Table Created')
        }
      }
    )

    const stmt = db.prepare('INSERT INTO cards VALUES (?, ?, ?, ?)')
    for (let i = 0; i < 10; i++) {
      stmt.run([uuidv4(), `titulo ${i}`, `conteudo ${i}`, `lista ${i}`])
    }
    stmt.finalize()
  })
}
