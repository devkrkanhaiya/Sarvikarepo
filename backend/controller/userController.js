const userModal = require('../modal/usemodal')


exports.addUser = async (req, res, next) => {
    console.log(req.file,req.body);
    // req.check('email', 'email is require').notEmpty();
    // req.assert('email', 'Email is invalid ').isEmail();
    // req.assert('name', 'Name should be min 3 char').isLength({ min: 3 });

    userModal.find({ email: req.body.email }).then((exist) => {
        if (exist.length) {
            res.status(200).json({ status: false, message: 'Email already exist', });
        } else {
            const imgPath = req.file && req.file.filename
            const user = new userModal({
                name: req.body.name,
                email: req.body.email,

            });
            user.profile_picture = 'images/' + imgPath
            user.save().then(result => {
                if (result) {
                    res.status(200).json({ status: true, message: 'User Created', data: result });
                }
            })
        }
    })
}


exports.getUser = async (req, res, next) => {
    userModal.find().then((data) => {
        if (data) {
            res.status(200).json({ status: true, message: 'Get all user', data });

        }
    })
}