const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST, PORT } = process.env;
const login = DB_HOST.split(".net/");
const db = login[1].split("?");
db[0] = "test";
const DB_TEST_HOST = login[0] + ".net/" + db.join("?");

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(
      "test",
      mongoose.connection.close(() => done())
    );
  });

  test("test login route", async () => {
    const name = "testUser";
    const email = "testUser@gmail.com";

    const hashPassword = await bcrypt.hash(name, 10);
    const avatarURL = gravatar.url(email);

    const newUser = {
      name: name,
      email: email,
      password: hashPassword,
      avatarURL,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "testUser@gmail.com",
      password: name,
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
