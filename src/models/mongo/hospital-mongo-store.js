import mongoose from "mongoose";
import { Hospital } from "./hospital.js";

export const hospitalMongoStore = {
  async getAllHospitals() {
    return Hospital.find().lean();
  },

  async getHospitalById(id) {
    return Hospital.findById(new mongoose.Types.ObjectId(id)).lean();  // ✅ Fix: Use Mongoose findById
  },

  async addHospital(hospital) {
    const newHospital = new Hospital(hospital);
    return newHospital.save();  // ✅ Fix: Use Mongoose Model save()
  },

  async getUserHospitals(userId) {
    return Hospital.find({ userId }).lean();
  },

  async deleteHospitalById(id) {  // ✅ Fix: Proper function name
    return Hospital.deleteOne({ _id: new mongoose.Types.ObjectId(id) });  // ✅ Fix: Ensure ObjectId conversion
  },
};
