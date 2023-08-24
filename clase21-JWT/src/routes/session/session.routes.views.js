import { Router } from "express"

import { HandleRenderSessionLogin, HandleRenderSessionSignup } from '../../controllers/session/session.controllers.views.js'



const router = Router()


router.get('/',         HandleRenderSessionLogin)
router.get('/signup',   HandleRenderSessionSignup)

export default router