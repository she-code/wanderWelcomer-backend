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

  test("Add place test", async () => {
    let res = await agent.post("/api/v1/places/create").send({
      name: "Test place",
      location: "Chennai",
      description: "restaurant good",
      category: "restaurant",
      image: "https://source.unsplash.com/DH_u2aV3nGM",
      routes: ["653a35aeb2c235c215242686", "653a3e202d2150968c4c3432"],
    });

    expect(res.status).toBe(200);
  });
  test("get all places test", async () => {
    let res = await agent.get("/api/v1/places/all/restaurant");
    expect(res.status).toBe(200);
  });
  test("get place by id test", async () => {
    let res = await agent.get("/api/v1/places/653b9aae36f89a020624f7bf");
    expect(res.status).toBe(200);
  });
  test("delete place  test", async () => {
    let res = await agent.delete("/api/v1/places/653a42811972c37bb1e672b1");
    expect(res.status).toBe(200);
  });
});
