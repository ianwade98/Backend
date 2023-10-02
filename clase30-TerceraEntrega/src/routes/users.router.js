import { Router } from 'express';
import passport from 'passport';
import UsersController from '../controllers/users.controller.js';

class UsersRouter {
    constructor() {
        this.router = Router();
        this.router.post('/register', passport.authenticate('register', {
            failureRedirect: '/views/errorRegister',
            successRedirect: '/views/login',  
            passReqToCallback: true
        }));
        this.router.post('/login', passport.authenticate('login', {
            failureRedirect: '/views/errorLogin',
            successRedirect: '/views/products',  
            passReqToCallback: true
        }));
        this.router.get('/logout', UsersController.logout);
        this.router.get('/authGithub', passport.authenticate('github', { scope: ['user:email'] }));
        this.router.get('/github', passport.authenticate('github'), UsersController.githubLoginPassport);
    }

    getRouter() {
        return this.router;
    }
}

export default new UsersRouter();

// registro sin passport
// router.post('/register', async (req, res) => {
//     const newUser = await usersManager.createUser(req.body);
//     if (newUser) {
//         res.redirect('/views/login')
//     } else {
//         res.redirect('/views/errorRegister')
//     }
// });

// login sin passport
// router.post('/login', async (req, res) => {
//     const { email } = req.body;
//     const user = await usersManager.loginUser(req.body);
//     if (user) {
//         req.session.name = user[0].firstName;
//         req.session.email = email;
//         if (user[0].admin) {
//             req.session.role = 'admin'
//         } else {
//             req.session.role = 'user'
//         }
//         res.redirect('/views/products')
//     } else {
//         res.redirect('/views/errorLogin')
//     }
// });