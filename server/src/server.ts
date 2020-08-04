import express from 'express'

const app = express()

app.use(express.json())

app.post('/users', (req, res) => {
  console.log(req.body)

  return res.json([{ name: 'Lucas', age: 20 }, { name: 'Emily', age: 21 }])
})

app.listen(3030)