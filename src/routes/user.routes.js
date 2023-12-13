import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route("/register")
//   idhr me upload.single isleye use kar raha hu q ki muje khali single file hi upload karni hai isleye 
  .post(upload.single("avatar"), registerUser);

export default router;
