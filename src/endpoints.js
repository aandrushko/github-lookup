import axios from 'axios';
export const getRepositories = (params) => axios.get('https://api.github.com/search/repositories', { params});