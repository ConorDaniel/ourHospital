import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { staffJsonStore } from "./staff-json-store.js";
import { departmentJsonStore } from "./department-json-store.js";


export const hospitalJsonStore = {
  async getAllHospitals() {
    await db.read();
    return db.data.hospitals;
  },

  async addHospital(hospital) {
    await db.read();
    db.data.hospitals = db.data.hospitals || [];
    hospital._id = v4();  // ✅ Generate a unique ID
    db.data.hospitals.push(hospital);
    await db.write();
  },

  async getHospitalById(id) {
    await db.read();
    const hospital = db.data.hospitals.find((h) => h._id === id) || {};
    hospital.staffs = await staffJsonStore.getStaffsByHospitalId(id);
    hospital.departments = await departmentJsonStore.getDepartmentsByHospitalId(id);
    return hospital;
  },

  async getUserHospitals(userid) {
    await db.read();
    return (db.data.hospitals || []).filter((hospital) => hospital.userid === userid);
  },
  
  async deleteHospitalById(id) {
    await db.read();
    const index = db.data.hospitals.findIndex((hospital) => hospital._id === id);
    db.data.hospitals.splice(index, 1);
    await db.write();
  },

  async deleteAllHospitals() {
    db.data.hospitals = [];
    await db.write();
  },
};
