const listContacts = require("./contacts/listContacts");
const getContactById = require("./contacts/getContactById");
const removeContact = require("./contacts/removeContact");
const addContact = require("./contacts/addContact");
const updateContact = require("./contacts/updateContact");
const updateStatusContact = require("./contacts/updateStatusContact");

const register = require("./auth/register");
const login = require("./auth/login");
const getCurrent = require("./auth/getCurrent");
const logout = require("./auth/logout");
const updateAvatar = require("./auth/updateAvatar");
const verify = require("./auth/verify");
const resendEmail = require("./auth/resendEmail");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendEmail,
};
