const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('add this link at :- https://ruptime.asitro.ml/add')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
