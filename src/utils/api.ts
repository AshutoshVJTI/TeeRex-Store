import { Product } from '../types/Product';

const API_BASE_URL = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart';

export const fetchCatalog = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/catalogue.json`);
    if (!response.ok) {
      throw new Error('Error fetching catalog');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching catalog:', error);
    throw new Error('Error fetching catalog');
  }
};