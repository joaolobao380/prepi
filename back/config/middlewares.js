const bodyParser = require('body-parser')
const cors = require('cors')


module.exports = app => {
    app.use(bodyParser.json({
        limit: '100mb',
        extended: true,
        parameterLimit:500000
    }))
    app.use(cors({
        origin: '*'
    }))
}