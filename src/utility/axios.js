import axios from 'axios';

const intance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export default intance;
