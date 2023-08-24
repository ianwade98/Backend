import mongoose from "mongoose"

import app from './app.js'

import { PORT, DB_USER, DB_PASSWORD, DB_NAME } from './config/config.js'
import { serverConection } from './utils/socket.utils.js'

const server = app.listen(PORT, (err) => {
    err ? console.error(err)
    : console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

/* ---------------------------------- */
/* -------- Conexion a mongo -------- */
/* ---------------------------------- */
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.glf5qjj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

serverConection(server)