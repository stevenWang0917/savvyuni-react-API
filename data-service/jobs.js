const sqlite3 = require('sqlite3').verbose()
const file = './db/database.sqlite'
const table = 'Full Stack Developer'

const db = new sqlite3.Database(file, err => {
  if(err) console.log(err)
})

const getItems =() => new Promise((resolve, reject) => {
  const sql = `SELECT * FROM "${table}" WHERE active=1`
  db.all(sql, (err, rows) => {
    if(err){
      reject(err)
      return
    }
    resolve(rows)
  })
})

module.exports = { getItems }