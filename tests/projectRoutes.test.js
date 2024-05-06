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
    server.close()
})

describe('projects routes', () => {
    test('POST /projects', async() => {
        await request(server).post('/projects')
        .send(testProject)
        .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.text).toMatch(new RegExp(`successfully added new project to database!`)) 
        })
    })
})
