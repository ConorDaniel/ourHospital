import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const departments = await db.departmentStore.getUserDepartments(loggedInUser._id);
      const viewData = {
        title: "Department Dashboard",
        user: loggedInUser,
        departments: departments,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addDepartment: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newDepartment = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.departmentStore.addDepartment(newDepartment);
      return h.redirect("/dashboard");
    },
  },

  deleteDepartment: {
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      await db.departmentStore.deleteDepartmentById(department._id);
      return h.redirect("/dashboard");
    },
  },
};
