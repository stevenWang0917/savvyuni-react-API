const express = require('express')
const router = express.Router()
const { getItems } = require('../data-service/jobs')

router.get('/', (req, res) => {
  getItems()
  .then(rows => res.json(rows))
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

module.exports = router