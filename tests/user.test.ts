import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { describe, expect, it, afterEach, beforeEach } from "@jest/globals";
import { UserTest } from "./test-utils";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.delete();
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      name: "",
      username: "",
      password: "",
    });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should register new user is valid request", async () => {
    const response = await supertest(web).post("/api/users").send({
      name: "test",
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.username).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should user login is valid request", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it("should user login reject if username is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "wrong",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should user login reject if password is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should get current user is valid request", async () => {
    const response = await supertest(web).get("/api/users/current").set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.username).toBe("test");
  });

  it("should get current user reject if token is wrong", async () => {
    const response = await supertest(web).get("/api/users/current").set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should update current user is name", async () => {
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "test").send({
      name: "test2",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test2");
  });

  it("should update current user is password", async () => {
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "test").send({
      password: "test2",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);

    const user = await UserTest.get();
    expect(await bcrypt.compare("test2", user.password)).toBe(true);
  });

  it("should update current user reject if request is invalid", async () => {
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "test").send({
      name: "",
      username: "",
      password: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should update current reject if token is wrong", async () => {
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "wrong").send({
      name: "test2",
      username: "test2",
      password: "test2",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should delete current user token", async () => {
    const response = await supertest(web).delete("/api/users/logout").set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UserTest.get();
    expect(user.token).toBeNull();
  });

  it("should delete current user reject if token is wrong", async () => {
    const response = await supertest(web).delete("/api/users/logout").set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
