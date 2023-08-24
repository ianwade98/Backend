import { sessionService } from '../../dao/services/session.service.js'
import { User } from '../../dao/models/user.model.js'


export const HandleSessionLogin = async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
}

export const HandleSessionSignup = async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
}

export const HandleSessionLogout = async (req, res) => {
    try {

        req.session.destroy(err => {
            if(!err) res.send('Se cerró la sesion')
            else res.send({status: 'No se pudo cerrar la sesion', body: err})
        })
        
    } catch (error) {
        req.status(400).send({ error })
    }
}