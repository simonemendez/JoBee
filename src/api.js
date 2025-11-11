import axios from "axios";
import { mockCompanies, mockJobs, mockUser } from "./mockData";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const USE_MOCK_DATA = !process.env.REACT_APP_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * Falls back to mock data if no backend is available.
 *
 */

class JoBeeApi {
  // the token for interacting with the API will be stored here.
  static token = JSON.parse(localStorage.getItem("token")) || null;

  // get request for companies or jobs
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // If no real backend, handle with mock data
    if (USE_MOCK_DATA) {
      return this.handleMockRequest(endpoint, data, method);
    }

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoBeeApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Handle requests with mock data
  static handleMockRequest(endpoint, data = {}, method = "get") {
    console.log("Using MOCK DATA -", endpoint);

    // Mock login - accept any username/password
    if (endpoint === "auth/token") {
      return { token: "mock-jwt-token-" + Date.now() };
    }

    // Mock register - same as login
    if (endpoint === "auth/register") {
      return { token: "mock-jwt-token-" + Date.now() };
    }

    // Mock get current user
    if (endpoint.startsWith("users/")) {
      return { user: mockUser };
    }

    // Mock get companies
    if (endpoint === "companies" || endpoint.startsWith("companies?")) {
      // Simple search by name if provided
      if (data.name) {
        const filtered = mockCompanies.filter(c =>
          c.name.toLowerCase().includes(data.name.toLowerCase())
        );
        return { companies: filtered };
      }
      return { companies: mockCompanies };
    }

    // Mock get single company
    if (endpoint.startsWith("companies/")) {
      const handle = endpoint.split("/")[1];
      const company = mockCompanies.find(c => c.handle === handle);
      return { company: company || mockCompanies[0] };
    }

    // Mock get jobs
    if (endpoint === "jobs" || endpoint.startsWith("jobs?")) {
      if (data.title) {
        const filtered = mockJobs.filter(j =>
          j.title.toLowerCase().includes(data.title.toLowerCase())
        );
        return { jobs: filtered };
      }
      return { jobs: mockJobs };
    }

    // Mock get single job
    if (endpoint.startsWith("jobs/")) {
      const jobId = endpoint.split("/")[1];
      const job = mockJobs.find(j => j.id === parseInt(jobId));
      return { job: job || mockJobs[0] };
    }

    // Mock apply to job
    if (endpoint.includes("/jobs/")) {
      return { applied: true };
    }

    // Default mock response
    return {};
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Log in user given a username and password and get a token */
  static async login(username, password) {
    let res = await this.request(`auth/token`,
      { "username": username, "password": password },
      "post");
    JoBeeApi.token = res.token;

    console.log(`res.token `, res.token);
    console.log(`right after login, localStorage `, localStorage);

    return JoBeeApi.token;
  }

  /** Register user given a username, password, firstName, lastName, and email,
   *  then return a token */
  static async register(username, password, firstName, lastName, email) {
    let res = await this.request(`auth/register`,
      {
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      },
      "post");
    JoBeeApi.token = res.token;
    return JoBeeApi.token;
  }

  /** Get the current user given a valid username and token */
  static async getCurrentUser(username) {
    console.log(username, "USERNAME INSIDE GETCURRENTUSER")
    let res = await this.request(`users/${username}`)
    return res.user;
  }

    /** Save user profile page. */

    static async saveProfile(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    }

    /** User applies for a job. */

    static async applyToJob(username, id) {
      console.log("IN API - APPLY TO JOB")
      let res = await this.request(`users/${username}/jobs/${id}`);
      return res;
    }

}

export default JoBeeApi;