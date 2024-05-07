const express = require('express')
const { Validator } = require('express-json-validator-middleware')
const { projectSchema } = require('../schemas/projectSchema')
const connection = require('../data/index')
const { formatProjectsResponse, formatProjectWithId } = require('../utils/transformData')

// use a router instead of express() so that we are using the same instance from index.js
const router = express.Router()
const { validate } = new Validator()



router.get('/', (req, res) => {
    const queryParams = req.query
    if(Object.keys(queryParams).length > 0) {
        const title = queryParams.title
        const tech = queryParams.tech?.split(',').join('%')
        connection.query(
            'SELECT * FROM project WHERE title LIKE ? OR tech LIKE ?',
            [  `%${title}%`, `%${tech}%`]
        , (err, result) => {
            if(!!err) throw err
            else {
                const projects = formatProjectsResponse(result)
                res.json(projects)
            }
        })
    }
    else {
        connection.query('SELECT * FROM project', (err, result) => {
        if (err) throw err
        else {
            const projects = formatProjectsResponse(result)
            res.json(projects)
        }
        })
    }
})

router.get('/:id', (req, res) => {
    // :id can be retrieved using req.params object
    const queryId = req.params.id
    connection.query(`SELECT * FROM PROJECT WHERE id=${queryId}`, (err, result) => {
        if(err) throw err
        else {
            const project = formatProjectsResponse(result)
            res.json(project)
        }
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
                const newProjectDetails = formatProjectWithId(newProject, result.insertId)
                res.json(newProjectDetails)
            }
        })
})

router.put(
    '/edit/:id',
    validate({ body: projectSchema }),
    (req, res) => {
    const id = req.params.id
    const editProject = {
        title: req.body.title,
        link: req.body.link,
        repository: req.body.repository,
        tech: req.body.tech.join(',')
    }
    connection.query(`UPDATE project SET ? WHERE id=${id}`, editProject, (err, result) => {
        if(err) throw err
        else {
            const updatedProject = formatProjectWithId(editProject, result.insertId)
            res.json(updatedProject)
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

