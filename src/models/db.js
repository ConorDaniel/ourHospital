import { userMemStore } from "./mem/user-mem-store.js";
import { departmentMemStore } from "./mem/department-mem-store.js";
import { staffMemStore } from "./mem/staff-mem-store.js";

export const db = {
  userStore: null,
  departmentStore: null,
  staffStore: null,

  init() {
    this.userStore = userMemStore;
    this.departmentStore = departmentMemStore;
    this.staffStore = staffMemStore;
  },
};
