const fs = require('fs')
const path = require('path')
const express = require('express')
const { notes } = require('./db/db.json')
const { title } = require('process')
const PORT = process.env.PORT || 3001
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

function findByTitle(title, notesArray){
    const result = notesArray.filter(notes=> notes.title === title)[0]
    return result
}
function createNewNote( body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray},null, 2)
    )

    return note
}
function validateNote(note){
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    if (!note.text || typeof note.text !== 'string') {
        return false
    }
}
app.get('/api/notes', (req, res) => {
    
let results = notes;
console.log(req.query)
res.json(results)
})

app.get('api/animals/:title', (req,res) => {
    const result = findByTitle(req.params.title, notes)
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
})

app.post('/api/notes', (req, res) =>{
    req.body.title = notes.legnth.toString()

    if (!validateNote(req.body)){
        res.status(400).send("the note is not properly formatted.")
    }
    else{
        const note = createNewNote(req.body, notes)
    res.json(note)
}
    
})
app.listen(PORT, () => {
    console.log( 'API server now on port')
})
