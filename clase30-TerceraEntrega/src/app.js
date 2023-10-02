import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { __dirname } from './utils.js'
import CartsRouter from './routes/carts.router.js';
import ProductsRouter from './routes/products.router.js';
import ViewsRouter from './routes/views.router.js';
import UsersRouter from './routes/users.router.js';
import './persistence/mongo/mongoConfig.js';
import passport from 'passport';
import './passport/passportStrategies.js';
import config from './config.js';

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

config.PERSISTENCE === 'MONGO' ? app.use(session({
        secret: 'sessionKey',
        resave: false,
        saveUninitialized: true,
        store: new mongoStore({
            mongoUrl: 'mongodb+srv://fedeeribeiro:coderhouse@cluster0.hj7njhs.mongodb.net/eCommerceProjectCoderhouse?retryWrites=true&w=majority'
            })
        })
    ) : null;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/carts', CartsRouter.getRouter());
app.use('/api/products', ProductsRouter.getRouter());
app.use('/api/users', UsersRouter.getRouter());
app.use('/views', ViewsRouter.getRouter());

const httpServer = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando al puerto ${config.PORT}.`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado con el ID ${socket.id}.`);
    socket.emit('fetchProducts');
    socket.on('updateProducts', () => {
        socket.emit('fetchProducts')
    });
    socket.on('disconnect', () => {
        console.log(`Usuario con ID ${socket.id} se ha desconectado.`)
    })
})