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
  });

  afterAll(async () => {
    // Close the server and disconnect from MongoDB
    await server.close();
    await mongoose.disconnect();
  });

  test("Apply committe test", async () => {
    let res = await agent.post("/api/v1/committes/apply").send({
      userId: "653b58c0962d88c5deca0088",
      image:
        "https://memetizando.com/wp-content/uploads/2020/09/Aadhar-Card-678x381.jpg",
      reason: "I want to contribute",
      committeType: "government",
    });

    // expect(res.statusCode).toBe(302);
    expect(res.status).toBe(200);
  });
});
