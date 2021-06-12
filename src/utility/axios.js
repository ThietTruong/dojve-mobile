import axios from 'axios';
import { ipv4 } from './IPv4';
const intance = axios.create({
  baseURL: `https://dojve-server.herokuapp.com/`,
  withCredentials: true,
});

export default intance;
