import { db } from "../models/db.js";
import Joi from "joi";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!loggedInUser) {
        return h.redirect("/login");
      }
  
      // ✅ Only fetch hospitals that belong to the logged-in user
      const hospitals = await db.hospitalStore.getUserHospitals(loggedInUser._id);
  
      const viewData = {
        title: "Hospital Dashboard",
        user: loggedInUser,
        hospitals: hospitals,  // ✅ Now only contains hospitals for this user
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addHospital: {
    validate: {
      payload: {
        name: Joi.string().min(1).required(),
        type: Joi.string().optional(),  
      },
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Hospital Error", errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;  // ✅ Ensure logged-in user exists
      console.log("Logged-in user:", loggedInUser);  // 🔴 DEBUG: Check if user is retrieved
      
      if (!loggedInUser || !loggedInUser._id) {
        console.log("User session missing! Redirecting to login...");
        return h.redirect("/login");  // ✅ Prevents adding hospitals without a user ID
      }
    
      const newHospital = {
        userId: loggedInUser._id,  // ✅ Assign the correct user ID
        name: request.payload.name,
        type: request.payload.type || "",  
      };
    
      console.log("New hospital data:", newHospital);  // 🔴 DEBUG: Check what is being saved
    
      await db.hospitalStore.addHospital(newHospital);
      return h.redirect("/dashboard");
    }
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
