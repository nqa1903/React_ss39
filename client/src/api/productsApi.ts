import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = 'http://localhost:3001/products';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get(API_URL);
    return res.data;
  },
  add: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const res = await axios.post(API_URL, product);
    return res.data;
  },
  delete: async (id: number): Promise<number> => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
};
