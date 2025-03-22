import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const departmentApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.findById(request.params.id);
      if (!hospital) {
        return Boom.notFound("Hospital not found");
      }
      const department = await db.departmentStore.addDepartment(hospital._id, request.payload);
      return h.response(department).code(201);
    },
    description: "Create a department in a hospital",
    notes: "Creates a new department inside a specified hospital",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        name: Joi.string().required(),
        specialty: Joi.string().optional()
      })
    }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      const department = await db.departmentStore.findById(request.params.id);
      if (!department) {
        return Boom.notFound("Department not found");
      }
      return department;
    },
    description: "Get a department by ID",
    notes: "Returns a department by its unique ID",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },

  update: {
    auth: false,
    handler: async function (request, h) {
      const updated = await db.departmentStore.updateDepartment(request.params.id, request.payload);
      return updated;
    },
    description: "Update a department",
    notes: "Updates name or specialty of a department",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        name: Joi.string().optional(),
        specialty: Joi.string().optional()
      })
    }
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      await db.departmentStore.deleteDepartment(request.params.id);
      return h.response().code(204);
    },
    description: "Delete a department by ID",
    notes: "Deletes a specific department",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  }
};
