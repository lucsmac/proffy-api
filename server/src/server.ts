import express from 'express'

const app = express()

app.get('/users', (req, res) => {
  return res.json([{ name: 'Lucas', age: 20 }, { name: 'Emily', age: 21 }])
})

app.listen(3030)