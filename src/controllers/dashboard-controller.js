import { db } from "../models/db.js";
import Joi from "joi";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const hospitals = await db.hospitalStore.getUserHospitals(loggedInUser._id);
      const viewData = {
        title: "Hospital Dashboard",
        user: loggedInUser,
        hospitals: hospitals,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addHospital: {
    validate: {
      payload: {
        name: Joi.string().min(1).required(),
      },
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Hospital Error", errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newHospital = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.hospitalStore.addHospital(newHospital);
      return h.redirect("/dashboard");
    },
  },

  deleteHospital: {
    handler: async function (request, h) {
      await db.hospitalStore.deleteHospitalById(request.params.id);
      return h.redirect("/dashboard");
    },
  },
  deleteDepartment: {
    handler: async function (request, h) {
      await db.departmentStore.deleteDepartmentById(request.params.id);
      return h.redirect("/dashboard");
    },
  },
};
