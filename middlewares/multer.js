const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "public/images/items",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadSingle = multer({
  storage: storage,
  //limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|gif/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = { uploadSingle };