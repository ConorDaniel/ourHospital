// import { userMemStore } from "./mem/user-mem-store.js";
// import { departmentMemStore } from "./mem/department-mem-store.js";
// import { staffMemStore } from "./mem/staff-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { departmentJsonStore } from "./json/department-json-store.js";
import { staffJsonStore } from "./json/staff-json-store.js";


export const db = {
  userStore: null,
  departmentStore: null,
  staffStore: null,

  init() {
    this.userStore = userJsonStore;
    this.departmentStore = departmentJsonStore;
    this.staffStore = staffJsonStore;
  },
};
