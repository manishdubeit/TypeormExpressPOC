import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

// import { multer } from 'multer';
var multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/',
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + file.originalname);
  }
});
const middleware = multer({ storage: storage });

const router = Router();

//Get all entry
router.get("/", [checkJwt, checkRole(["ADMIN"])], PhotoController.listAll);

// Get one entry
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  PhotoController.getOneById
);

//Create a new entry
// router.post("/", [checkJwt, checkRole(["ADMIN"])], middleware.single('myfile'), PhotoController.newPhoto);
router.post("/", [checkJwt, checkRole(["ADMIN"])], middleware.array('myfile', 12), PhotoController.newPhoto);

// photo with metadata and albums
router.post("/photoMetadata", [checkJwt, checkRole(["ADMIN"])], PhotoController.newPhotoWithMetaData);
router.post("/photoAlbums", [checkJwt, checkRole(["ADMIN"])], PhotoController.newPhotoWithAlbums);

//Edit one entry
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  PhotoController.editPhoto
);

//Delete one entry
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  PhotoController.deletePhoto
);

export default router;