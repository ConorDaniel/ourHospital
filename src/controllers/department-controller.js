import { v4 } from "uuid";
import { db } from "../models/db.js";
import { DepartmentSpec, StaffSpec } from "../models/joi-schemas.js";

export const departmentController = {
  index: {
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      if (!department) {
        return h.response("Department not found").code(404);
      }

      const hospital = await db.hospitalStore.getHospitalById(department.hospitalId);
      if (!hospital) {
        return h.response("Hospital not found").code(404);
      }
      
      const staff = await db.staffStore.getStaffByDepartmentId(department._id); // ✅ Fetch staff members
      
      const viewData = {
        title: "Department",
        hospital: hospital,
        department: department,
        staff: staff,
      };
      return h.view("department-view", viewData);
    },
  },

  addDepartment: {
    validate: {
      payload: DepartmentSpec,  // ✅ Validate department input
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("hospital-view", { title: "Add department error", errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.getHospitalById(request.params.hospitalId);
      if (!hospital) {
        return h.response("Hospital not found").code(404);
      }

      const newDepartment = {
        _id: v4(),
        hospitalId: hospital._id,
        title: request.payload.title,  
      };

      await db.departmentStore.addDepartment(newDepartment);
      return h.redirect(`/hospital/${hospital._id}`);
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
      if (!department) {
        return h.response("Department not found").code(404);
      }

      const hospital = await db.hospitalStore.getHospitalById(department.hospitalId);
      if (!hospital) {
        return h.response("Hospital not found").code(404);
      }

      const newStaff = {
        role: request.payload.role,
        name: request.payload.name,
        years: request.payload.years,
        departmentid: department._id,
      };

      await db.staffStore.addStaff(department._id, newStaff);
      return h.redirect(`/hospital/${hospital._id}/department/${department._id}`);
    },
  },

  deleteStaff: {
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.id);
      if (!department) {
        return h.response("Department not found").code(404);
      }

      await db.staffStore.deleteStaff(request.params.staffid);
      return h.redirect(`/hospital/${department.hospitalId}/department/${department._id}`);
    },
  },

  deleteDepartment: {
    handler: async function (request, h) {
      const hospital = await db.hospitalStore.getHospitalById(request.params.hospitalId);
      if (!hospital) {
        return h.response("Hospital not found").code(404);
      }

      await db.departmentStore.deleteDepartmentById(request.params.id);
      return h.redirect(`/hospital/${hospital._id}`);
    },
  },
};
