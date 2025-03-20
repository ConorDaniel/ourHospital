import { db } from "./connect.js"; // Ensure this points to your MongoDB connection

export const hospitalMongoStore = {
  async getAllHospitals() {
    return db.collection("hospitals").find().toArray();
  },

  async getHospitalById(id) {
    return db.collection("hospitals").findOne({ _id: id });
  },

  async addHospital(hospital) {
    const result = await db.collection("hospitals").insertOne(hospital);
    return result.insertedId;
  },

  async deleteHospital(id) {
    return db.collection("hospitals").deleteOne({ _id: id });
  },
};
