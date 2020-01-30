const Express = require('express')
const routes = require('./routes')
const serverConfig = require('./configs/serverConfig')
const app = Express()

require('./database')

app.use(Express.urlencoded({ extended: false }))
app.use(Express.json())
app.use(routes)

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server is running on  http://${serverConfig.host}:${serverConfig.port}/`)
})
