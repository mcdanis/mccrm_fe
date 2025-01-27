import { api } from "@/utils/utils";
import Cookies from "js-cookie";

class ApiService {
  protected headerAuth;
  constructor() {
    this.headerAuth = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("mccrm_token")}`,
    };
  }

  getCookiesUserId() {
    return Cookies.get("mccrm_user_id");
  }

  getCookiesToken() {
    return Cookies.get("mccrm_token");
  }

  async getClients() {
    try {
      const response = await api("clients", {
        method: "GET",
        headers: this.headerAuth,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    try {
      const response = await api("users", {
        method: "GET",
        headers: this.headerAuth,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getCampaigns() {
    try {
      const response = await api("campaigns", {
        method: "GET",
        headers: this.headerAuth,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getCampaignsWithSubs(status: number, name: string) {
    try {
      const response = await api(
        "campaigns-with-subs?status=" + status + "&campaign=" + name,
        {
          method: "GET",
          headers: this.headerAuth,
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(id: number) {
    try {
      const response = await api("user/" + id, {
        method: "GET",
        headers: this.headerAuth,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getSubCampaign(id: number) {
    try {
      const response = await api("sub-campaign/" + id, {
        method: "GET",
        headers: this.headerAuth,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async delete(model: string, id: number) {
    try {
      const response = await api("client/delete/" + model + "/" + id, {
        method: "DELETE",
        headers: this.headerAuth,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async addCampaign(
    campaignName: string,
    campaignStatus: string,
    subCampaignName: string,
    clientId: string,
    subCampaignOwner: string,
    subCampaignManager: string,
    subCampaignStatus: string,
    isCampaign = ""
  ) {
    try {
      const response = await api("campaign/add", {
        method: "POST",
        headers: this.headerAuth,
        body: JSON.stringify({
          campaignName,
          campaignStatus,
          clientId,
          subCampaignName,
          subCampaignOwner,
          subCampaignManager,
          subCampaignStatus,
          userId: Cookies.get("mccrm_user_id"),
          isCampaign,
        }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async addContact(formData: object) {
    try {
      const response = await api("campaign/sub-campaign/contact", {
        method: "POST",
        headers: this.headerAuth,
        body: JSON.stringify(formData),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getContacts(subCampaignId: number) {
    try {
      const response = await api(
        "campaign/sub-campaign/contacts/" + subCampaignId,
        {
          method: "GET",
          headers: this.headerAuth,
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getContact(contactsId: number) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/" + contactsId,
        {
          method: "GET",
          headers: this.headerAuth,
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  header(type: string = "GET", formData: object = {}) {
    return {
      method: type,
      headers: this.headerAuth,
      ...(type === "POST" && { body: JSON.stringify(formData) }),
    };
  }

  async addNote(data: object) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/note",
        this.header("POST", data)
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async addActivity(data: object) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/activity",
        this.header("POST", data)
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async updateContact(data: object) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/update",
        this.header("POST", data)
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getContactTimeline(contactId: number) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/timeline/" + contactId,
        this.header()
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async findContacts(keyword: string) {
    try {
      const response = await api(
        "campaign/contact/search?keyword=" + keyword,
        this.header()
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async importContact(data: object) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/import",
        this.header("POST", data)
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async duplicateContact(id: number) {
    try {
      const response = await api(
        "campaign/sub-campaign/contact/duplicate/" + id,
        this.header("POST", {})
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ApiService;
