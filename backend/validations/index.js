exports.signinValidator = (req, res, next) => {
    req.check('email', 'email is require').notEmpty();
    req.check('password', 'password is require').notEmpty()
    req.check('name', 'name is require').notEmpty()
    req.check('device_type', 'device_type is require').notEmpty()
    req.check('device_id', 'device_id is require').notEmpty()
    const error = req.validationErrors();
    if (error) {
        const firstError = error.map((err) => err.msg)[0]
        return res.status(400).json({ status: 'false', message: firstError })
    }
    next()
}