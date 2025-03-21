import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { maggie, testUsers } from "./fixtures.js";

let OurHospitalService;

describe("User API tests", () => {
  before(async () => {
    const module = await import("../src/services/ourhospital-service.js");
    OurHospitalService = module.OurHospitalService;
  });

  beforeEach(async () => {
    await OurHospitalService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i++) {
      testUsers[i] = await OurHospitalService.createUser(testUsers[i]);
    }
  });

  it("should create a user", async () => {
    const newUser = await OurHospitalService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  it("should get a user", async () => {
    const user = await OurHospitalService.getUser(testUsers[0]._id);
    assertSubset(testUsers[0], user);
  });

  it("should get all users", async () => {
    const users = await OurHospitalService.getUsers();
    assert.equal(users.length, testUsers.length);
  });

  it("should delete all users", async () => {
    await OurHospitalService.deleteAllUsers();
    const users = await OurHospitalService.getUsers();
    assert.equal(users.length, 0);
  });
});
