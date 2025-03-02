import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { departmentController } from "./controllers/department-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/adddepartment", config: dashboardController.addDepartment },

  { method: "GET", path: "/department/{id}", config: departmentController.index },
  { method: "POST", path: "/department/{id}/addstaff", config: departmentController.addStaff },
  
  { method: "GET", path: "/dashboard/deletedepartment/{id}", config: dashboardController.deleteDepartment },
  { method: "GET", path: "/department/{id}/deletestaff/{staffid}", config: departmentController.deleteStaff },

];