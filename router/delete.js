const express = require('express')
const router = express.Router()
const { remove } = require('../data-service/delete')

router.put('/:id', (req, res) => {
  remove(req.params.id)
  .then(result => {
    if(result === 1) {
      res.sendStatus(200)
      return
    }
    res.sendStatus(404)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

module.exports = router