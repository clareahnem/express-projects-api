const express = require('express')
const { Validator } = require('express-json-validator-middleware')
const db = require('./db')
const { projectSchema } = require('./projectSchema')

const port = process.env.PORT || 3000
const app = express()
const { validate } = new Validator()

app.use(express.json())

app.get('/projects', (req, res) => {
    // no need to add response code in express bc it will do so automatically
    res.json(db.projects)
})

app.get('/projects/:id', (req, res) => {
    // :id can be retrieved using req.params object
    const project = db.projects.find((proj) => proj.id == req.params.id)
    res.json(project)
})

app.post(
    '/projects',
    validate({ body: projectSchema }),
    (req, res) => {
    // expect new project to be passed in via the request body
    try {
        const newProject = req.body
        console.log('new project is', newProject)
        newProject.id = db.projects.length + 1
        db.projects.push(newProject)
        res.send(`new project has been added successfully: ${JSON.stringify(newProject)}`)
    } catch (e) {
        console.log("error making post request", e)
    }
})

app.delete('/projects/:id', (req, res) => {
    const projectToDelete = db.projects.find((proj) => proj.id == req.params.id)
    if(!projectToDelete) return res.status(400).send('There is no matching project with id', req.params.id)
    //TODO implement delete functionality once it is connected to a database
    const projIndx = db.projects.indexOf(projectToDelete)
    db.projects.splice(projIndx, 1)
    res.send(`successfully removed project ${JSON.stringify(projectToDelete)}`)
})


// we must add a listener so that the response is being listened when we run the server
app.listen(port, () => {
    console.log(`projects api now listening on port ${port}`)
})
