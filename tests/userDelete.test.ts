import { afterEach, beforeEach, describe, it, expect } from "@jest/globals";
import { UserTest } from "./test-utils";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("DELETE /api/users/:username", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should delete current user data", async () => {
    const user = await UserTest.get();
    const response = await supertest(web).delete(`/api/users/current/${user.username}`);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should delete current user reject if user data not found", async () => {
    const user = await UserTest.get();
    const response = await supertest(web).delete(`/api/users/current/${user.username + "wrong"}`);
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
