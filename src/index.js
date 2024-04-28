const express = require('express')
const projectsRouter = require('./routes/projects')

const port = process.env.PORT || 3000
const app = express()

//musr add express.json() so that we can accept json request bodies
app.use(express.json())
app.use('/projects', projectsRouter)

// we must add a listener so that the response is being listened when we run the server
app.listen(port, () => {
    console.log(`projects api now listening on port ${port}`)
})
