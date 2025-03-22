import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { createServer } from "../src/server-instance.js"; // ✅ updated import

chai.use(chaiHttp);

let app;
let hospitalId, departmentId, staffId;

before(async () => {
  app = await createServer(); // ✅ create isolated test server

  const hospRes = await chai.request(app).post("/api/hospitals").send({
    name: "Southgate Hospital",
    type: "Regional",
  });
  hospitalId = hospRes.body._id || hospRes.body.id;

  const deptRes = await chai.request(app)
    .post(`/api/hospitals/${hospitalId}/departments`)
    .send({ name: "Radiology" });
  departmentId = deptRes.body._id || deptRes.body.id;
});

describe("Staff API", () => {
  it("should create a staff member", async () => {
    const res = await chai.request(app)
      .post(`/api/departments/${departmentId}/staff`)
      .send({ name: "Dr. Hannah Byrne", role: "Consultant" });
    expect(res).to.have.status(201);
    expect(res.body.name).to.equal("Dr. Hannah Byrne");
    staffId = res.body._id || res.body.id;
  });

  it("should fail to create staff with blank name", async () => {
    const res = await chai.request(app)
      .post(`/api/departments/${departmentId}/staff`)
      .send({ name: "", role: "Nurse" });
    expect(res).to.have.status(400);
  });

  it("should retrieve the staff member", async () => {
    const res = await chai.request(app).get(`/api/staff/${staffId}`);
    expect(res).to.have.status(200);
    expect(res.body.name).to.equal("Dr. Hannah Byrne");
  });

  it("should update the staff name", async () => {
    const res = await chai.request(app)
      .put(`/api/staff/${staffId}`)
      .send({ name: "Dr. Hannah B." });
    expect(res).to.have.status(200);
    expect(res.body.name).to.equal("Dr. Hannah B.");
  });

  it("should delete the staff member", async () => {
    const res = await chai.request(app).delete(`/api/staff/${staffId}`);
    expect(res).to.have.status(204);
  });
});
