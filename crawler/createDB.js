const cheerio = require('cheerio')
const axios = require('axios')

const sqlite3 = require('sqlite3').verbose()
const file = './db/database.sqlite'

const db = new sqlite3.Database(file, err => {
  if(err) console.log(err)
})

let instance = axios.create({
  baseURL: 'https://ca.indeed.com',
  timeout: 2500,
})

const getData = async() => {
  const data = []
  for(let i=0; i< 500; i=i+10){
    let html = await instance.get(`/jobs?q=web+developer&l=Toronto&start=${i}`).then(res => res.data)
    const $ = cheerio.load(html);
    $("div.jobsearch-SerpJobCard").each((i, e) => {
      const textArr = $(e).text().split('\n').filter(
        e => e !== '' && e !== ' ' && e !=='new' && e !== '•' && !e.toLowerCase().includes('remote') 
        && !e.toLowerCase().includes('easily') && !e.toLowerCase().includes('view all') &&
        isNaN(Number(e)) || e.includes('.NET')
      )
      const rawDate = textArr.find(e => e.includes('ago'))
      const date = rawDate && rawDate.slice(0, rawDate.indexOf('o')+1) || ''
      const job = {
        id: $(e)[0].attribs.id,
        title: textArr[0],
        company: textArr[1],
        location: textArr[2],
        salary: textArr.find(e => e.slice(0,1) === '$') || '',
        description: textArr.filter(e => e.slice(0,1) === ' ').join(''),
        date,
        active: 1 
      }
      data.push(job)
    })
  }
  _store(data)
}

const _store = (data) => {
  const length = Object.keys(data[0]).length
  const columns = Object.keys(data[0]).join(', ')
  console.log(columns)
  console.log(Object.values(data[0]))
  const table = "Full Stack Developer"
  const sql_create = `CREATE TABLE IF NOT EXISTS "${table}" (
    id varchar(50) PRIMARY KEY NOT NULL,
    title varchar(200) NOT NULL,
    company varchar(200) NOT NULL,
    location varchar(500),
    salary varchar(200),
    description varchar(800),
    date varchar(200),
    active integer(2) NOT NULL DEFAULT(1)
  );`
  db.run(sql_create);
  const sql_insert = `INSERT INTO "${table}" (${Object.keys(data[0]).join(', ')}) VALUES (${"?, ".repeat(length-1)}?);`
  console.log(sql_insert)
  data.forEach(e => {
    db.run(sql_insert, Object.values(e), err => {
      if (err) console.log("ERROR: ", err)
    })
  })
}

getData()


