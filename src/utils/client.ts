import Axios from 'axios';
import { BASE_URL } from './constants';

const instance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
