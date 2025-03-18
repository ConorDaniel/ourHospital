import { db } from "../models/db.js";
import { StaffSpec } from "../models/joi-schemas.js";

export const departmentController = {
  index: {
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      const hospital = await db.hospitalStore.getHospitalById(department.hospitalId);
      const viewData = {
        title: "Department",
        hospital: hospital,
        department: department,
      };
      return h.view("department-view", viewData);
    },
  },

  addStaff: {
    validate: {
      payload: StaffSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("department-view", { title: "Add staff error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      const newStaff = {
        role: request.payload.role,
        name: request.payload.name,
        years: request.payload.years,
      };
      await db.staffStore.addStaff(department._id, newStaff);
      return h.redirect(`/department/${department._id}`);
    },
  },

  deleteStaff: {
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      await db.staffStore.deleteStaff(request.params.staffid);
      return h.redirect(`/department/${department._id}`);
    },
  },
};
