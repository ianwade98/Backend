import { Router } from "express"

import { HandleRenderMessages } from '../../controllers/messages/messages.controllers.views.js'
import { requireSession } from '../../middlewares/session.middleware.js'



const router = Router()


router.get('/',  requireSession, HandleRenderMessages)

export default router