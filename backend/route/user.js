var express = require('express');
router = express.Router()
multer = require('multer');
var upload = multer({ dest: 'backend/images' })
const User = require('../controller/userController')



router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.')[1];
        let newFileName = Date.now() + '.' + fileExt;
        cb(null, newFileName)
    }
});
var upload = multer({ storage: storage });



router.post('/adduser', upload.single('profile_picture'), User.addUser)
router.get('/getuser', User.getUser)



module.exports = router;
