import axios from 'axios';

const fetch = axios.create({
  // baseURL: 'https://dating-app-api-8ok4.onrender.com',
  baseURL: 'http://localhost:3000',
});

const ENDPOINT = '/graphql';

export { fetch, ENDPOINT };
