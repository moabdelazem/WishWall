/**
 * @jest-environment node
 */
import request from "supertest";
import { app } from "../src/app.js";
import WishModel from "../src/models/wish.model.js";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

describe("Wish Controller Tests", () => {
  describe("POST /api/v1/wishes", () => {
    // Reset mocks before each test
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new wish successfully", async () => {
      const mockWish = {
        id: 1,
        title: "Test Wish",
        created_at: new Date().toISOString(),
      };

      // Mock the createWish method
      jest.spyOn(WishModel, "createWish").mockResolvedValue(mockWish);

      const response = await request(app)
        .post("/api/v1/wishes")
        .send({ title: "Test Wish" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockWish);
      expect(WishModel.createWish).toHaveBeenCalledWith({ title: "Test Wish" });
    });

    it("should return 400 when title is missing", async () => {
      const response = await request(app).post("/api/v1/wishes").send({});

      expect(response.status).toBe(400);
      expect(WishModel.createWish).not.toHaveBeenCalled();
    });

    it("should return 400 when title exceeds 255 characters", async () => {
      const longTitle = "a".repeat(256);

      const response = await request(app)
        .post("/api/v1/wishes")
        .send({ title: longTitle });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(WishModel.createWish).not.toHaveBeenCalled();
    });

    it("should handle database errors", async () => {
      jest
        .spyOn(WishModel, "createWish")
        .mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/api/v1/wishes")
        .send({ title: "Test Wish" });

      expect(response.status).toBe(500);
      expect(WishModel.createWish).toHaveBeenCalledWith({ title: "Test Wish" });
    });
  });
});
