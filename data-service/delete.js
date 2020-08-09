const sqlite3 = require('sqlite3').verbose()
const file = './db/database.sqlite'
const table = 'Full Stack Developer'

const db = new sqlite3.Database(file, err => {
  if(err) console.log(err)
})

const remove = (id) => new Promise((resolve, reject) => {
  const sql = `UPDATE "${table}" SET active=0 WHERE id = ?`
  db.run(sql, [id], function(err){
    if(err) reject(err)
    if(this.changes !== 1){
      resolve(0)
      return
    }
    resolve(1)
  })
})

module.exports = { remove }