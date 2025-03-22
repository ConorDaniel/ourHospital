import chai from "chai";
import chaiHttp from "chai-http";
import { assert, expect } from "chai";
import { createServer } from "../src/server-instance.js";



chai.use(chaiHttp);

let app;
let hospitalId;

before(async () => {
  app = await createServer(); // ✅ create isolated test server
});

describe("Hospital API", () => {
  it("should create a hospital", async () => {
    const res = await chai.request(app).post("/api/hospitals").send({
      name: "Lakeside General",
      type: "Regional",
    });
    expect(res).to.have.status(201);
    expect(res.body.name).to.equal("Lakeside General");
    hospitalId = res.body._id || res.body.id;
  });

  it("should not create a hospital with empty name", async () => {
    const res = await chai.request(app).post("/api/hospitals").send({
      name: "",
      type: "National",
    });
    expect(res).to.have.status(400); // You may need to enforce this validation in your API
  });

  it("should fetch the created hospital", async () => {
    const res = await chai.request(app).get(`/api/hospitals/${hospitalId}`);
    expect(res).to.have.status(200);
    expect(res.body.name).to.equal("Lakeside General");
  });

  it("should update the hospital name", async () => {
    const res = await chai.request(app)
      .put(`/api/hospitals/${hospitalId}`)
      .send({ name: "Lakeside Community Hospital" });
    expect(res).to.have.status(200);
    expect(res.body.name).to.equal("Lakeside Community Hospital");
  });

  it("should delete the hospital", async () => {
    const res = await chai.request(app).delete(`/api/hospitals/${hospitalId}`);
    expect(res).to.have.status(204);
  });

  it("should return 404 for deleted hospital", async () => {
    const res = await chai.request(app).get(`/api/hospitals/${hospitalId}`);
    expect(res).to.have.status(404);
  });
});
