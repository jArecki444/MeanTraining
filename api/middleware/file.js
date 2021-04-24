const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
  };
  const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      callback(error, "api/images");
    },
    filename: (req, file, callback) => {
      const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, name + "-" + Date.now() + "." + ext);
    },
  });
  module.exports = multer({ storage: multerConfig }).single("image");