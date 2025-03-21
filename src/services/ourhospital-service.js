import axios from "axios";
import { serviceUrl } from "../../test/fixtures.js";

export const OurHospitalService = {
  baseUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.baseUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.baseUrl}/api/users/${id}`);
    return res.data;
  },

  async getUsers() {
    const res = await axios.get(`${this.baseUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.baseUrl}/api/users`);
    return res.data;
  },
};
