import axios from 'axios';
import {ipv4} from './IPv4';
const intance = axios.create({
  baseURL: `http://${ipv4}:5000`,
  // baseURL:"http://localhost:5000/"
  withCredentials: true,
});

export default intance;
