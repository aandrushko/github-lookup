import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const getRepositories = (params) =>
  axios.get("https://api.github.com/search/repositories", { params });
