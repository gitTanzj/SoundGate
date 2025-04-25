import axios from 'axios';
import { getApiUrl } from './functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('session');
      if (token) {
        config.headers['authorization'] = JSON.parse(token).access_token;
      }
    } catch (error) {
      console.error('Error accessing token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;