const sqlite3 = require('sqlite3').verbose()
const file = './db/database.sqlite'
const table = 'Full Stack Developer'

const db = new sqlite3.Database(file, err => {
  if(err) console.log(err)
})

const updateContent = (id, data) => new Promise((resolve, reject) => {
  const columns = Object.keys(data)
  const values = Object.values(data)
  const sql = `UPDATE "${table}" SET ${columns.join('=?, ') + "=?"} WHERE id = ?`
  db.run(sql, [...values, id], function(err){
    if(err) reject(err)
    if(this.changes !== 1){
      resolve(0)
      return
    }
    resolve(1)
  })
})

const updateTag = (data) => new Promise((resolve, reject) => {
  const sql = `ALTER TABLE "${table}" ADD ${data.tag} VARCHAR2(50)`
  db.run(sql, function(err){
    if(err){
     reject(err)
     return
    }
    resolve()
  })
})

module.exports = { updateContent, updateTag }