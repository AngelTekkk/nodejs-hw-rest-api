const { addSchema, updateSchema, updateFavoriteSchema } = require("./contacts");
const { registerSchema, loginSchema, resendEmailSchema } = require("./user");

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  resendEmailSchema,
};
