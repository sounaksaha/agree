import express from "express";
import passport from "passport";
import { getProfile } from "../controllers/Auth/authController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { validateRegistration } from "../middleware/validate.js";
import { registerUser } from "../controllers/admin_controller/userCreate.js";
import {
  createForm,
  deleteForm,
  getAllForms,
  getFormById,
  updateForm,
} from "../controllers/admin_controller/formController.js";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);

router.get(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  getProfile
);
router.post(
  "/form/create",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  createForm
);
router.get(
  "/form/get",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  getAllForms
);
router.get(
  "/form/by",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  getFormById
);

router.put(
  "/form/update",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  updateForm
);

router.delete(
  "/form/delete",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  deleteForm
);

export default router;
