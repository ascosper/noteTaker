const express = require('express')
const app = express()

app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.get('/api/notes', (req, res) => {
    
let results = notes;
console.log(req.query)
res.json(results)
})

app.listen(3001, () => {
    console.log( 'API server now on port')
})