import request from "supertest";
import server from "../server";

describe("Test API", () => {
  it("Debería retornar el mensaje API running...", async () => {
    const res = await request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("API running...");
  });
});
