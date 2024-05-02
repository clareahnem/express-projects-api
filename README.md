# How to create an express project
- create a node package manager with command `npm init` on a new folder
    - you should see a series of prompts to add your project name, git repository...etc
- install express onto your project `npm i express`
- install nodemon if you want to continue running server while coding `npm i --save-dev nodemon`
- add start and dev scripts to your package.json


# Calling api on your command line
### GET requests
1. GET all projects
    - `curl "localhost:3000/projects"`
2. GET project by Id
    - `curl "localhost:3000/projects/{id}`
3. Search Projects by title and/or tech stack
    - `curl "localhost:3000/projects?title='{title}'&tech='{tech}'`
    - [NOTE] Tech query can take multiple tech stack separated by comma e.g. `tech='HTML,JavaScript'`

### POST request
1. POST new project
    - `curl -X POST -H "Content-Type: application/json" --data '{"title": ...}' "localhost:3000/projects"`

### DELETE request
1. DELETE project by Id
    - `curl -X DELETE -H "localhost:3000/projects/{id}"`

### PUT request
1. UPDATE existing project by Id
    - `curl -X -H "Content-Type: application/json" --data '{"title": ...}' "localhost:3000/projects/edit/{id}"`


---
# Future Considerations
## 1. Add images for each project
- want to connect to a database, maybe google cloud storage

