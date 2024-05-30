import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (e) {
      console.log("Appwrite service :: login :: error : ", e);
    }
  }

  async getCurrentUser() {
    try {
        // console.log("Hellow 1");
        return await this.account.get();
        // console.log(response);
        // console.log("Hellow 2");
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
        // console.log("Hellow 3");
    }
    // console.log("Hellow 4");

    return null;
}

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error : ", error);
    }
  }
}

const authService = new Authservice();

export default authService