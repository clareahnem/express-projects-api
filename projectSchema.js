const projectSchema = {
    type: "object",
    required: ["title", "tech"],
    properties: {
        id: {
           type: "number" 
        },
        title: {
            type: "string"
        },
        tech: {
            type: "array"
        },
        link: {
            type: "string"
        },
        repository: {
            type: "string"
        }
    }
}

exports.projectSchema = projectSchema;