import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { departmentController } from "./controllers/department-controller.js";
import { hospitalController } from "./controllers/hospital-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  // Dashboard (List Hospitals)
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addhospital", config: dashboardController.addHospital },
  { method: "GET", path: "/dashboard/deletehospital/{id}", config: dashboardController.deleteHospital },

  // Hospital View (Departments inside a hospital)
  { method: "GET", path: "/hospital/{id}", config: hospitalController.index },

  // Departments inside a Hospital (Fixed URL Structure)
  { method: "GET", path: "/hospital/{hospitalId}/department/{id}", config: departmentController.index },  // ✅ Now departments are inside hospitals
  { method: "POST", path: "/hospital/{hospitalId}/department/add", config: departmentController.addDepartment },  // ✅ Add department inside hospital
  { method: "GET", path: "/hospital/{hospitalId}/department/{id}/delete", config: departmentController.deleteDepartment },  // ✅ Delete department inside hospital

  // Staff inside a Department
  { method: "POST", path: "/hospital/{hospitalId}/department/{id}/addstaff", config: departmentController.addStaff },
  { method: "GET", path: "/hospital/{hospitalId}/department/{id}/deletestaff/{staffid}", config: departmentController.deleteStaff },

  { method: "GET", path: "/public/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }


];
