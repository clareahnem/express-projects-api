const express = require('express')
const { Validator } = require('express-json-validator-middleware')
const db = require('../data/db')
const { projectSchema } = require('../schemas/projectSchema')

// use a router instead of express() so that we are using the same instance from index.js
const router = express.Router()
const { validate } = new Validator()


router.get('/', (req, res) => {
    // no need to add response code in express bc it will do so automatically
    res.json(db.projects)
})

router.get('/:id', (req, res) => {
    // :id can be retrieved using req.params object
    const project = db.projects.find((proj) => proj.id == req.params.id)
    res.json(project)
})

router.post(
    '/',
    validate({ body: projectSchema }),
    (req, res) => {
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

router.delete('/:id', (req, res) => {
    const projectToDelete = db.projects.find((proj) => proj.id == req.params.id)
    if(!projectToDelete) return res.status(400).send('There is no matching project with id', req.params.id)
    //TODO implement delete functionality once it is connected to a database
    const projIndx = db.projects.indexOf(projectToDelete)
    db.projects.splice(projIndx, 1)
    res.send(`successfully removed project ${JSON.stringify(projectToDelete)}`)
})

module.exports = router

