import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const hospitalApi = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      return db.hospitalStore.findAll();
    },
    description: "Get all hospitals",
    notes: "Returns an array of all hospital records",
    tags: ["api"]
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const hospital = await db.hospitalStore.findById(request.params.id);
        if (!hospital) {
          return Boom.notFound("Hospital not found");
        }
        return hospital;
      } catch (err) {
        return Boom.badImplementation(err.message);
      }
    },
    description: "Get a single hospital by ID",
    notes: "Returns hospital details or 404 if not found",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.addHospital(request.payload);
      return h.response(hospital).code(201);
    },
    description: "Create a new hospital",
    notes: "Adds a hospital and returns the new object",
    tags: ["api"],
    validate: {
      payload: Joi.object({
        name: Joi.string().required(),
        type: Joi.string()
          .valid("National", "Regional", "Local", "Other")
          .required()
      })
    }
  },

  update: {
    auth: false,
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.findById(request.params.id);
      if (!hospital) {
        return Boom.notFound("Hospital not found");
      }
      const updatedHospital = await db.hospitalStore.updateHospital(
        request.params.id,
        request.payload
      );
      return updatedHospital;
    },
    description: "Update a hospital",
    notes: "Updates name or type of a hospital",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        name: Joi.string().optional(),
        type: Joi.string()
          .valid("National", "Regional", "Local", "Other")
          .optional()
      })
    }
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      await db.hospitalStore.deleteHospital(request.params.id);
      return h.response().code(204);
    },
    description: "Delete a hospital by ID",
    notes: "Deletes a specific hospital",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await db.hospitalStore.deleteAll();
      return h.response().code(204);
    },
    description: "Delete all hospitals",
    notes: "Deletes all hospital records",
    tags: ["api"]
  }
};
