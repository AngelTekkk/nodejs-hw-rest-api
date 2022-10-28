const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { registerSchema, loginSchema } = require("../../schemas");

const ctrl = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
