import axios from "axios";

class UserService {
  constructor() {
    this.baseURL = process.env.REACT_APP_SERVER_URL;
  }

  async list() {
    try {
      const response = await axios.get(`${this.baseURL}/users`);
      return response.data.users;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch users");
    }
  }

  async get(id) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${id}`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch user");
    }
  }

  async create(data) {
    try {
      const response = await axios.post(`${this.baseURL}/users`, data);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to create user");
    }
  }

  async update(id, data) {
    try {
      const response = await axios.put(`${this.baseURL}/users/${id}`, data);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to update user");
    }
  }

  async delete(id) {
    try {
      await axios.delete(`${this.baseURL}/users/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to delete user");
    }
  }
}

const userService = new UserService();
export default userService;
