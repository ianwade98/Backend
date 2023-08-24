import { Router } from "express"

import { HandleGetProducts } from '../controllers//realTimeProducts.controllers.js'



const router = Router()


router.get('/', HandleGetProducts)

export default router