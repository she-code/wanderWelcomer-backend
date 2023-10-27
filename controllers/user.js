const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/users");
const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);
let server, agent;
const { generateHashedPassword } = require("../utils/index");
describe("API Endpoints", () => {
  beforeAll(async () => {
    // Connect to a test MongoDB database
    const mongoURI = DB; // Use a separate test database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Start the Express.js server
    server = app.listen(4000);
    agent = request.agent(server);
    const cleanPassword = "password"; // Example password
    const hashedPassword = await generateHashedPassword(cleanPassword);
    console.log("Hashed Password:", hashedPassword);
    await agent
      .post("/api/v1/users/register")
      .type("form")
      .send({
        email: "test1@gmail.com",
        password: "password",
        firstName: "Test",
        lastName: "Haile",
      })
      .then((res) => {
        console.log(res, "cookies");
        const cookies = res.headers["set-cookie"][0]
          .split(",")
          .map((item) => item.split(";")[0]);
        cookie = cookies.join(";");
        console.log({ admin: cookie });
      });
  });

  afterAll(async () => {
    // Close the server and disconnect from MongoDB
    await server.close();
    await mongoose.disconnect();
  });

  test("Sign up test", async () => {
    let res = await agent
      .post("/api/v1/users/register")
      .send({
        firstName: "Test",
        lastName: "User",
        email: "test2@gmail.com",
        password: "12345678",
        _csrf: csrfToken,
      })
      .set("Cookie", cookie);

    // expect(res.statusCode).toBe(302);
    expect(res.status).toBe(200);
  });
});
