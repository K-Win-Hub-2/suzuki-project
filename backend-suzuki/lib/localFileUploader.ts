import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const pathName = path.join(path.join(__dirname,".."), "public/"+ file.fieldname)
      cb(null, pathName)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })

  const uploadStorage = multer({ storage: storage })

  export default uploadStorage