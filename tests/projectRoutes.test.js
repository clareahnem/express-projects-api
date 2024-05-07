const request = require('supertest')
const { server } = require('../src/index')
const connection = require('../src/data/index')


const testProject = {
    "title": "test project 1",
    "link": "http://testProject1.link",
    "repository": "http://testProject1.repo",
    "tech": ["JavaScript", "HTML"]
}

beforeAll(() => {
    connection.query(`CREATE TABLE project (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        link MEDIUMTEXT,
        repository MEDIUMTEXT,
        tech SET('HTML', 'CSS', 'JavaScript', 'Express.js') NOT NULL,
        PRIMARY KEY (id)
    )`)
})

afterAll(() => {
    connection.query(`DROP TABLE project`, (err, result) => {
        if(!!err) console.log('could not delete project table', err)
    })
    connection.end()
})

afterEach(() => {
    server.close()
})

describe('projects routes', () => {
    test('POST /projects -> can upload new projects', async () => {
        await request(server).post('/projects')
        .send(testProject)
        .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.body).toHaveProperty('id')
            expect(response.body.title).toEqual(testProject.title)
        })
    })

    // test('POST /projects -> can upload projects without link or repo', async () => {
    //     const project = {
    //         "title": "test project 2",
    //         "tech": ["CSS", "TypeScript"]
    //     }
    //     await request(server).post('/projects')
    //     .send(project)
    //     .then((response) => {
    //         expect(response.status).toEqual(200)
    //         // expect(response.body).not.toHaveProperty('link')
    //         // expect(response.body).not.toHaveProperty('repository')
    //         expect(response.body).toHaveProperty('id')
    //     })

    // }) 

    test('GET /projects -> can get all existing projects', async() => {
        await request(server).get('/projects')
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.body.length).toEqual(1)
            expect(response.body[0].title).toEqual('test project 1')
            expect(response.body[0].tech).toEqual(["HTML", "JavaScript"])
        })
    })

    test('GET /projects/:id -> can get project by id', async () => {
        await request(server).get('/projects/1')
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.body[0]).toHaveProperty('title')
            expect(response.body[0].title).toEqual('test project 1')
        })
    })

    test('GET /projects/:id -> will return empty array if no matching id', async () => {
        await request(server).get('/projects/7569')
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.body).toEqual([])
        })
    })

    test ('GET /project?title -> can get project by title', async () => {
        const searchParam = 'title=test'
        await request(server).get(`/projects?${searchParam}`)
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.body).toHaveLength(1)
            expect(response.body[0].title).toEqual('test project 1')
        })

    })

    test('GET/project?title -> will return empty array if there are no match', async () => {
        const searchParam = 'title=random'
        await request(server).get(`/projects?${searchParam}`)
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.body).toEqual([])
        })
    })

    test('PUT /projects/edit/:id -> can edit existing project', async () => {
        const updatedProject = {
            ...testProject,
            "title": "test project edited"
        }
        await request(server).put('/projects/edit/1')
        .send(updatedProject)
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.body.title).toEqual('test project edited')
        })
    })

    test('DELETE /project/:id -> can delete an existing project', async () => {
        await request(server).delete('/projects/1')
        .then(response => {
            expect(response.status).toEqual(200)
            expect(response.text).toEqual('successfully removed project with id 1')
        })
    })
})
