const express = require('express')
const { Validator } = require('express-json-validator-middleware')
const { projects } = require('../data/db')
const { projectSchema } = require('../schemas/projectSchema')
const connection = require('../data/index')

// use a router instead of express() so that we are using the same instance from index.js
const router = express.Router()
const { validate } = new Validator()


router.get('/', (req, res) => {
    // no need to add response code in express bc it will do so automatically
    connection.query('SELECT * FROM project', (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

router.get('/:id', (req, res) => {
    // :id can be retrieved using req.params object
    const queryId = req.params.id
    connection.query(`SELECT * FROM PROJECT WHERE id=${queryId}`, (err, result) => {
        if(err) throw err
        res.json(result)
    })
})

router.post(
    '/',
    validate({ body: projectSchema }),
    (req, res) => {
        const newProject = {
            title: req.body.title,
            link: req.body.link,
            repository: req.body.repository,
            tech: req.body.tech.join(',')
        }
        connection.query(`INSERT INTO project SET ?`, newProject, (err, result) => {
            if(err) throw err
            else {
                res.send(`successfully added new project to database!, ${JSON.stringify(newProject)}}`)
            }
        })
})

router.delete('/:id', (req, res) => {

    connection.query(`DELETE FROM project WHERE id=${req.params.id}`, (err, result) => {
        if(err) throw err
        else {
            res.send(`successfully removed project with id ${req.params.id}`)
        }
    })
})

module.exports = router

