import { Router } from "express"

import {
    HandleRenderCarts,
    HandleRenderProductsCart
} from '../../controllers/carts/carts.controllers.views.js'
import { requireSession } from '../../middlewares/session.middleware.js'



const router = Router()


router.get('/',      requireSession, HandleRenderCarts)
router.get('/:cid',  requireSession, HandleRenderProductsCart)

export default router