import { Router } from "express"
import passport from "passport"

import { HandleSessionLogin, HandleSessionLogout, HandleSessionSignup } from '../../controllers/session/session.controllers.js'



const router = Router()



router.get('/github',           passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github/callback',  passport.authenticate('github', { failureRedirect: '/' }), async (req, res) => {
    req.session.user = req.user.payload
    res.redirect('/products')
})

router.post('/login',           passport.authenticate('login', { failureRedirect: '/' }),   HandleSessionLogin)
router.post('/signup',          passport.authenticate('signup', { failureRedirect: '/' }),  HandleSessionSignup)
router.delete('/logout',        HandleSessionLogout)

export default router