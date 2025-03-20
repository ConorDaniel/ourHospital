import { db } from "./connect.js"; // Ensure this connects to your MongoDB instance

export const staffMongoStore = {
  async getAllStaff() {
    return db.collection("staff").find().toArray();
  },

  async getStaffById(id) {
    return db.collection("staff").findOne({ _id: id });
  },

  async addStaff(staff) {
    const result = await db.collection("staff").insertOne(staff);
    return result.insertedId;
  },

  async updateStaff(id, updatedStaff) {
    return db.collection("staff").updateOne({ _id: id }, { $set: updatedStaff });
  },

  async deleteStaff(id) {
    return db.collection("staff").deleteOne({ _id: id });
  },
};
