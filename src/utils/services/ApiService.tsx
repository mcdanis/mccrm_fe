import { api } from "@/utils/utils";
import Cookies from "js-cookie";

class ApiService {
  async getClients() {
    try {
      const response = await api("clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("mccrm_token")}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteClient(id) {
    try {
      const response = await api("client/delete/client/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("mccrm_token")}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ApiService;
