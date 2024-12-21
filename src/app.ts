"use strict"
import express from "express"
const app = express()
const port = 8001

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// listen server
app.listen(port, "0.0.0.0", () => {
    return console.log(`Server listening on port ${port}!`)
})