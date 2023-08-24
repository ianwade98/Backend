export const HandleRenderMessages = async (req, res) => {
    let name;

    if(req.session.user) {
        name = req.session.user.user_name
    }

    res.render('messages', { title: 'Messages', name })
}