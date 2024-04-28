# How to create an express project
- create a node package manager with command `npm init` on a new folder
    - you should see a series of prompts to add your project name, git repository...etc
- install express onto your project `npm i express`
- install nodemon if you want to continue running server while coding `npm i --save-dev nodemon`
- add start and dev scripts to your package.json


# Calling api on your command line
There is no need to add a header to your curl command
- `curl "localhost:3000/projects"`