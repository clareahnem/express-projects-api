const formatProjectsResponse = (projects) => {
    const formattedProjects = projects.map((proj) => {
        return {
            ...proj,
            tech: proj.tech.split(',')
        }
    })
    return formattedProjects
}

const formatProjectWithId = (project, assignedId) => {
    return {
        id: assignedId,
        ...project,
        tech: project.tech.split(',')
    }
}

module.exports = {
    formatProjectsResponse,
    formatProjectWithId
}