import request from "supertest";
import app from "./../src/server";
import { HttpStatus } from "../src/constants/httpCodes";

describe("Card Validation API", () => {
  const VALID_CARD = "4012888888881881";
  const INVALID_CARD = "4012888888881882";
  const ENDPOINT = "/api/v1/card/validate";

  describe("Success Scenarios", () => {
    it("should return isValid: true", async () => {
      const res = await request(app).post(ENDPOINT).send({
        cardNumber: VALID_CARD,
      });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isValid).toBe(true);
      expect(res.body.data.network).not.toBe("Unknown");
    });

    it("should return isValid: false", async () => {
      const res = await request(app).post(ENDPOINT).send({
        cardNumber: INVALID_CARD,
      });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.data.isValid).toBe(false);
      expect(res.body.message).toContain("Invalid");
    });
  });

  describe("System Health", () => {
    it("should respond to the health check", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(HttpStatus.OK);
    });

    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/api/v1/wrong-route");
      expect(res.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
