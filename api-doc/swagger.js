const swaggerJsDoc = require('swagger-jsdoc');
const options_ = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note API',
      version: '1.0.0',
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of pet to use",
          required: true,
          schema: {
            type: "array",
            items: {
              type: "string"
            }
          },
          "style": "simple"
        }
      ]
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
  

var OpenAiSpecification = swaggerJsDoc(options_);
module.exports = {OpenAiSpecification}