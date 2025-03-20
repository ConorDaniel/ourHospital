import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const staffJsonStore = {
  async getAllStaffs() {
    await db.read();
    return db.data.staffs;
  },

  async getStaffsByHospitalId(hospitalId) {
    await db.read();
    return db.data.staffs.filter((staff) => staff.hospitalId === hospitalId);
  },
  
  async addStaff(departmentId, staff) {
    await db.read();
    staff._id = v4();
    staff.departmentid = departmentId;
    db.data.staffs.push(staff);
    await db.write();
    return staff;
  },

  async getStaffsByDepartmentId(id) {
    await db.read();
    return db.data.staffs.filter((staff) => staff.departmentid === id);
  },

  async getStaffById(id) {
    await db.read();
    return db.data.staffs.find((staff) => staff._id === id);
  },

  async deleteStaff(id) {
    await db.read();
    const index = db.data.staffs.findIndex((staff) => staff._id === id);
    db.data.staffs.splice(index, 1);
    await db.write();
  },

  async deleteAllStaffs() {
    db.data.staffs = [];
    await db.write();
  },

  async updateStaff(staff, updatedStaff) {
    staff.role = updatedStaff.role;
    staff.name = updatedStaff.name;
    staff.years = updatedStaff.years;
    await db.write();
  },
};
