import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { maggie } from "./fixtures.js";

let OurHospitalService;

describe("User API tests", () => {
  before(async () => {
    const module = await import("../src/services/ourhospital-service.js");
    OurHospitalService = module.OurHospitalService;
  });

  it("should create a user", async () => {
    const newUser = await OurHospitalService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });
});
