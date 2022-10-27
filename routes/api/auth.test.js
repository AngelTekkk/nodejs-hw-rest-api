const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.test.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      name: "testUser",
      email: "testUser@gmail.com",
      password: "testUser",
    };

    const user = await request(app).post("/api/users/signup").send(newUser);

    const loginUser = {
      email: "testUser@gmail.com",
      password: "testUser",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    console.log(body.token);
    expect(body.token).toBeTruthy();
    const a = await User.findById(user._id);
    console.log(a);
    expect(body.token).toBe(token);
  });
});
