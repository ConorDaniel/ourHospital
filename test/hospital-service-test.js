import { test, beforeEach } from "node:test";
import assert from "assert/strict";
import { OurHospitalService } from "../src/services/ourhospital-service.js";

beforeEach(async () => {
  await OurHospitalService.deleteAllHospitals();
});

test("create a hospital", async () => {
  const hospital = { name: "River Valley", type: "Regional" };
  const created = await OurHospitalService.createHospital(hospital);
  assert.equal(created.name, hospital.name);
  assert.equal(created.type, hospital.type);
  assert.ok(created._id);
});

test("get all hospitals", async () => {
  await OurHospitalService.createHospital({ name: "A", type: "Local" });
  await OurHospitalService.createHospital({ name: "B", type: "National" });

  const hospitals = await OurHospitalService.getHospitals();
  assert.ok(hospitals.length >= 2);
});

test("get a single hospital", async () => {
  const hospital = await OurHospitalService.createHospital({ name: "One View", type: "Local" });
  const found = await OurHospitalService.getHospital(hospital._id);
  assert.equal(found.name, "One View");
});

test("delete a hospital", async () => {
  const hospital = await OurHospitalService.createHospital({ name: "To Be Deleted", type: "Other" });
  await OurHospitalService.deleteHospital(hospital._id);

  try {
    await OurHospitalService.getHospital(hospital._id);
    assert.fail("Expected 404 error not thrown");
  } catch (error) {
    assert.equal(error.response?.status, 404);
  }
});
