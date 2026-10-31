import { describe, it, expect, afterEach, beforeEach } from "@jest/globals";
import { CategoryTest, UserTest } from "./test-utils";
import { logger } from "../src/application/logging";
import supertest from "supertest";
import { web } from "../src/application/web";

describe("POST /api/categories", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create a category", async () => {
    const response = await supertest(web).post("/api/categories").set("X-API-TOKEN", "test").send({
      name: "test",
      description: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.description).toBe("test");
  });

  it("should reject to create a category if request is invalid", async () => {
    const response = await supertest(web).post("/api/categories").set("X-API-TOKEN", "test").send({
      name: "",
      description: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/categories/list", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CategoryTest.create();
  });

  afterEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get a list of categories", async () => {
    const response = await supertest(web).get("/api/categories/list").set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it("should reject to get a list of categories if token is wrong", async () => {
    const response = await supertest(web).get("/api/categories/list").set("X-API-TOKEN", "wrong");
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/categories/:id", () => {
  beforeEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.create();
    await CategoryTest.create();
  });

  afterEach(async () => {
    await CategoryTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update a category", async () => {
    const category = await CategoryTest.get();
    const response = await supertest(web).put(`/api/categories/${category.id}`).set("X-API-TOKEN", "test").send({
      name: "test2",
      description: "test2",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(category.id);
    expect(response.body.data.name).toBe("test2");
    expect(response.body.data.description).toBe("test2");
  });
});
