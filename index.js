const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
const connectToMongo = require('./db')
connectToMongo()
app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/Auth'))
app.use('/api/form', require('./routes/form'))

app.get('/status', (req,res)=>{
   try {
      res.status(200).send({success:true, msg:'OK'})
   } catch (error) {
      res.status(501).send({success:false, msg: error})
   }
})

app.listen(port, () => {
   console.log(`Formeze running on port ${port}`)
})  