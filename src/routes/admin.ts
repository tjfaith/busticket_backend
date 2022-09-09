import express from "express";
const router = express.Router();
import {
  RegisterAdmin,
  LoginAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
  getSingleAdmin,
  ImageLoginAdmin,
  checkEmail,
} from "../controller/admincontroller";

import { verifyToken } from "../middleware/auth";

router.post("/register", RegisterAdmin);

router.post("/login", LoginAdmin);

router.post("/imageLogin", ImageLoginAdmin);

router.patch("/update/:id", verifyToken, updateAdmin); 

router.get("/checkemail/:email", checkEmail); 

router.delete("/delete/:id", verifyToken, deleteAdmin);

router.get("/allAdmins", getAdmin);

router.get("/singleAdmin/:id", verifyToken, getSingleAdmin);

export default router;
