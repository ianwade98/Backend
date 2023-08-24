import express      from "express"
import path         from "path"
import { engine }   from "express-handlebars"

import session      from "express-session"
import MongoStore   from "connect-mongo"
import passport     from "passport"

import __dirname                            from './dirname.js'
import { DB_NAME, DB_USER, DB_PASSWORD }    from './config/config.js'
import { initPassport }                     from './config/passport.config.js'


/* ---------------------------------- */
/* ------- Importar Rutas Api ------- */
/* ---------------------------------- */
import RoutesSession  from './routes/session/session.routes.js'
import RoutesProducts from './routes/products/products.routes.js'
import RoutesCarts    from './routes/carts/carts.routes.js'
import RoutesMessages from './routes/messages/messages.routes.js'

/* ---------------------------------- */
/* ------ Importar Rutas Render ----- */
/* ---------------------------------- */
import RoutesViewsSession   from './routes/session/session.routes.views.js'
import RoutesViewsProducts  from './routes/products/products.routes.views.js'
import RoutesViewsMessages  from './routes/messages/messages.routes.views.js'
import RoutesViewsCarts     from './routes/carts/carts.routes.views.js'

import RoutesRealtimeProducts from './routes/realTimeProducts.routes.js'


const app = express()

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.glf5qjj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 100
    }),
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false
}))

// Passport
initPassport()
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(`${__dirname}/views`)))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', `${__dirname}/views`)
app.set('view engine', '.hbs')



/* ---------------------------------- */
/* ------------ Rutas Api ----------- */
/* ---------------------------------- */
app.use('/api/session',  RoutesSession)
app.use('/api/products', RoutesProducts)
app.use('/api/carts',    RoutesCarts)
app.use('/api/messages', RoutesMessages)

/* ---------------------------------- */
/* ----------- Rutas Views ---------- */
/* ---------------------------------- */
app.use('/',         RoutesViewsSession)
app.use('/products', RoutesViewsProducts)
app.use('/carts',    RoutesViewsCarts)
app.use('/messages', RoutesViewsMessages)

app.use('/realtimeproducts', RoutesRealtimeProducts)

app.use((req, res) => {
    res.status(404).send(`Error 404 \n Página no encontrada`)
})

export default app