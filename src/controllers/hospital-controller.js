import { db } from "../models/db.js";
import Joi from "joi";

export const hospitalController = {
  index: {
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.getHospitalById(request.params.id);
      const departments = await db.departmentStore.getDepartmentsByHospitalId(request.params.id);  // ✅ Get departments
      const viewData = {
        title: "Hospital",
        hospital: hospital,
        departments: departments,  // ✅ Pass departments to the view
      };
      return h.view("hospital-view", viewData);
    },
  },

  addHospital: {
    validate: {
      payload: {
        name: Joi.string().min(1).required(),
      },
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add hospital error", errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const newHospital = { name: request.payload.name };
      await db.hospitalStore.addHospital(newHospital);
      return h.redirect("/dashboard");
    },
  },

  addDepartment: {  // ✅ New function to add a department inside a hospital
    validate: {
      payload: {
        title: Joi.string().min(1).required(),
      },
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("hospital-view", { title: "Add department error", errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const hospitalId = request.params.id;
      const newDepartment = {
        hospitalId: hospitalId,
        title: request.payload.title,
      };
      await db.departmentStore.addDepartment(newDepartment);
      return h.redirect(`/hospital/${hospitalId}`);  // ✅ Redirect back to the hospital page
    },
  },

  deleteHospital: {
    handler: async function (request, h) {
      await db.hospitalStore.deleteHospitalById(request.params.id);
      return h.redirect("/dashboard");
    },
  },
};
