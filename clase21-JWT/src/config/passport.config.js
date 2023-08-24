import passport from "passport"
import github2 from "passport-github2"
import local from "passport-local"

import { User } from '../dao/models/user.model.js'
import { userService } from '../dao/services/user.service.js'
import { PASSPORT_GITHUB_CLIENTID, PASSPORT_GITHUB_CLIENTSECRET, PASSPORT_GITHUB_CALLBACKURL } from '../config/config.js'

import { isValidPassword } from '../utils/hashGenerator.utils.js'

const GitHubStrategy = github2.Strategy
const LocalStrategy = local.Strategy



export const initPassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: PASSPORT_GITHUB_CLIENTID,
        clientSecret: PASSPORT_GITHUB_CLIENTSECRET,
        callbackURL: PASSPORT_GITHUB_CALLBACKURL
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            let user = await userService.getUser(profile._json.email)

            if(user.status == 404) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: ' ',
                    user_name: profile._json.login,
                    age: ' ',
                    email: profile._json.email,
                    password: ' ',
                }
                let result = await userService.createUser(newUser)
                return done(null, result.payload)
            }
            return done(null, user)

        } catch (error) {
            return done( error )
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {

            let user = await userService.getUser(email)
            if(user.status == 404) { return done('Usuario no encontrado', false) }
            if (!isValidPassword(user.payload, password)) { return done('Contraseña no válida', false) }

            return done(null, user.payload)

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, email, password, done) => {
        try {
            
            const { first_name, last_name, user_name, age, role } = req.body
            let user = await userService.getUser(email)
            if(user.status == 200) {
                return done('El usuario ya existe', false)
            }

            const newUser = new User(first_name, last_name, user_name, age, email, password, role)
            const result = await userService.createUser(newUser)

            return done(null, result.payload)

        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}