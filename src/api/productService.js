import axios from 'axios';
import BASE_URL from './config';

export const getAllProducts = async (page = 0, size = 10) => {
    const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`);
    return res.data;
  };

  export const getProductById = async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };
  
