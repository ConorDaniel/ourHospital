import { test, before } from "node:test";
import assert from "assert/strict";
import request from "supertest";
import { createServer } from "../src/server-instance.js";

let app;
let hospitalId, departmentId;

before(async () => {
  app = await createServer();
});

test("should create a department", async () => {
  const hospRes = await request(app.listener).post("/api/hospitals").send({
    name: "Northfield Hospital",
    type: "Local",
  });

  console.log("Hospital response:", hospRes.statusCode, hospRes.body);

  hospitalId = hospRes.body._id || hospRes.body.id;
  assert.equal(hospRes.statusCode, 201);

  const res = await request(app.listener)
    .post(`/api/hospitals/${hospitalId}/departments`)
    .send({ name: "Emergency Medicine" });

  console.log("Department creation response:", res.statusCode, res.body);

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.name, "Emergency Medicine");

  departmentId = res.body._id || res.body.id;
});

test("should fail to create department with empty name", async () => {
  const res = await request(app.listener)
    .post(`/api/hospitals/${hospitalId}/departments`)
    .send({ name: "" });

  console.log("Empty name test response:", res.statusCode, res.body);
  assert.equal(res.statusCode, 400);
});
