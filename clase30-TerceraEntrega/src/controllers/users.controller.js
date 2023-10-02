class UsersController {
    logout = (req, res) => { 
        try {
            req.session.destroy( error => {
                if (error) {
                    console.log(error);
                    res.json({ message: error })
                } else {
                    res.redirect('/views/login');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    githubLoginPassport = (req, res) => {
        try {
            req.session.email = req.user.email;
            res.redirect('/views/products');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UsersController();