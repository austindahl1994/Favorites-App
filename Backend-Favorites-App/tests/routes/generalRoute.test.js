import request from "supertest";
import app from "../../app.js";

describe("General Routing Test", () => {
  test("Successfully connect to login page", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: "Connected to server" });
  });
});
