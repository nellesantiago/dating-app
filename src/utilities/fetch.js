import axios from 'axios';

const fetch = axios.create({
  // baseURL: 'https://toy-app-api.onrender.com',
  baseURL: 'http://localhost:3000',
});

const ENDPOINT = '/graphql';

export { fetch, ENDPOINT };
