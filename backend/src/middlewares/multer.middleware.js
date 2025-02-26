import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ 
    storage 
})

const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/posts")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    params:{
        folder: "posts",
        allowed_formats: ["jpg", "jpeg", "png", "gif"]
    }
})

export const postUpload = multer({
    storage: postStorage
})