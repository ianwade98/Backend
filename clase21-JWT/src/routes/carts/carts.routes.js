import { Router } from "express"

import {
    HandleAddProductCart,
    HandleCreateCart,
    HandleDeleteCart,
    HandleDeleteProductCart,
    HandleGetCart,
    HandleGetCarts,
    HandleUpdateCart,
    HandleUpdateProductCart
} from '../../controllers/carts/carts.controllers.js'



const router = Router()


router.get('/',                     HandleGetCarts)
router.post('/',                    HandleCreateCart)
router.get('/:cid',                 HandleGetCart)
router.put('/:cid',                 HandleUpdateCart)
router.delete('/:cid',              HandleDeleteCart)
router.put('/:cid/product/:pid',    HandleUpdateProductCart)
router.post('/:cid/product/:pid',   HandleAddProductCart)
router.delete('/:cid/product/:pid', HandleDeleteProductCart)

export default router