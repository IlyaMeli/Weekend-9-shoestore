import axios from "axios";

const dataApi = axios.create({
  baseURL: "https://61c310fb9cfb8f0017a3e935.mockapi.io/",
});
export default dataApi;
