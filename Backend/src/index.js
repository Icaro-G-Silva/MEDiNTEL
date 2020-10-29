try {
    const Express = require('express')
    const app = Express()
    const routes = require('./routes')
    const serverConfig = require('./configs/serverConfig')
    const cors = require('cors')

    require('./database')

    app.use(cors())
    app.use(Express.urlencoded({ extended: false }))
    app.use(Express.json())
    app.use(routes)

    app.listen(serverConfig.port, serverConfig.host, () => {
        console.log(`Server is running on  http://${serverConfig.host}:${serverConfig.port}/`)
    })
} catch (error) {
    console.error(`General error catched! -> ${error}`)
}
