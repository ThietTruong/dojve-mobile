import axios from 'axios';

const intance = axios.create({
  baseURL: 'http://10.0.2.2:5000',
  withCredentials: true,
});

export default intance;
