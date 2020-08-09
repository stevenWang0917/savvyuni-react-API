const express = require('express')
const router = express.Router()
const { updateContent, updateTag} = require('../data-service/update')

router.put('/content/:id', (req, res) => {
  updateContent(req.params.id, req.body)
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

router.put('/tag', (req, res) => {
  updateTag(req.body)
  .then(() => {
      res.sendStatus(200)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

module.exports = router