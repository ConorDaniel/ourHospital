import { db } from "../models/db.js";
import Joi from "joi";
import { HospitalSpec } from "../models/joi-schemas.js";

export const hospitalController = {
  index: {
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.getHospitalById(request.params.id);
      if (!hospital) {
        return h.response("Hospital not found").code(404);
      }
      
      const departments = await db.departmentStore.getDepartmentsByHospitalId(request.params.id);
      const viewData = {
        title: "Hospital",
        hospital: hospital,
        departments: departments,
      };
      return h.view("hospital-view", viewData);
    },
  },

  addHospital: {
    validate: {
      payload: HospitalSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add hospital error", errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      await db.hospitalStore.addHospital(request.payload);
      return h.redirect("/dashboard");
    },
  },

  deleteHospital: {
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.getHospitalById(request.params.id);
      if (!hospital) {
        return h.response("Hospital not found").code(404);
      }
      
      // Cleanup: Delete associated departments before deleting hospital
      await db.departmentStore.deleteDepartmentsByHospitalId(request.params.id);
      await db.hospitalStore.deleteHospitalById(request.params.id);
      return h.redirect("/dashboard");
    },
  },
};
