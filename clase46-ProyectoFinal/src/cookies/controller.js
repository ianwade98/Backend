const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    try {
        res.render('cookies')
    } catch (error) {
        console.log(error)
    }
})

// ingresar cookie
// router.get('/set', (req, res) => {
//     res.cookie('cookieClave', 'cookieValor',{signed:true}).send('cookie firmada enviada')
// })

router.get('/get', (req, res) => {
    const user = req.cookies.user
    if (user) {
        res.send('cookie recibida: ' + user)
    } else {
        res.send('No se encontró una cookie')
    }
})

router.post('/submit', (req, res) => {
    const { name, text } = req.body
    res.cookie('user', name).send('cookie creada')
})

router.get('/deleteCookie', (req, res) => {
    res.clearCookie("cookieClave").send('cookie eliminada')
})

router.get('/deleteAllCookies', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ status: 'Delete ERROR', body: err })
        } else {
            res.send('Cookies deleted')
        }
    })
})
   
   
   

module.exports = router