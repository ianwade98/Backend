export const HandleGetProducts = async (req, res ) => {
    const { page = 1 } = req.query

    let name

    if(req.session.user) {
        name = req.session.user.user_name
    }

    res.render('realtime-products', { title: 'Productos en tiempo real', page, name })
}