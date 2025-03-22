import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const staffApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      const department = await db.departmentStore.findById(request.params.id);
      if (!department) {
        return Boom.notFound("Department not found");
      }
      const staff = await db.staffStore.addStaff(department._id, request.payload);
      return h.response(staff).code(201);
    },
    description: "Add a staff member to a department",
    notes: "Creates a new staff member inside a given department",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        name: Joi.string().required(),
        role: Joi.string().required(),
        email: Joi.string().email().optional()
      })
    }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      const staff = await db.staffStore.findById(request.params.id);
      if (!staff) {
        return Boom.notFound("Staff member not found");
      }
      return staff;
    },
    description: "Find a staff member by ID",
    notes: "Returns details of a single staff member",
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
      const updatedStaff = await db.staffStore.updateStaff(request.params.id, request.payload);
      return updatedStaff;
    },
    description: "Update a staff member's details",
    notes: "Can update name, role, or email",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        name: Joi.string().optional(),
        role: Joi.string().optional(),
        email: Joi.string().email().optional()
      })
    }
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      await db.staffStore.deleteStaff(request.params.id);
      return h.response().code(204);
    },
    description: "Delete a staff member by ID",
    notes: "Deletes the staff member from the department",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  }
};
