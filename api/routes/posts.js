const express = require("express");
const multer = require("multer");
const PostController = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

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
router.post(
  "",
  checkAuth,
  multer({ storage: multerConfig }).single("image"),
  PostController.createPost
);
router.put(
  "/:id",
  checkAuth,
  multer({ storage: multerConfig }).single("image"),
  PostController.updatePost
);
router.get("", checkAuth, PostController.getPosts);
router.get("/:id", checkAuth, PostController.getPost);
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
