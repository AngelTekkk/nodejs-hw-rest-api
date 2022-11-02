const { User } = require("../../models/user");

const { RequestError, sendMail } = require("../../helpers");

const { PORT = 3000 } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Email not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}">Click to verify email on localhost</a>
          <p>OR</p>
          <a target="_blank" href="${HEROKU_APP}/api/users/verify/${user.verificationToken}">Click to verify email on heroku</a>`,
  };

  await sendMail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
