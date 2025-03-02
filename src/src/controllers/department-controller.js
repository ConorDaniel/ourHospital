import { db } from "../models/db.js";

export const departmentController = {
  index: {
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      const viewData = {
        title: "Department",
        department: department,
      };
      return h.view("department-view", viewData);
    },
  },

  addStaff: {
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
    handler: async function(request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      await db.staffStore.deleteStaff(request.params.staffid);
      return h.redirect(`/department/${department._id}`);
    },
  },

};
