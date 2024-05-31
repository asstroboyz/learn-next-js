
import axios from 'axios';

const apiEndPoint = 'http://localhost:8080/api/products';

export const getAllProducts = async () => {
  const response = await axios.get(apiEndPoint);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(apiEndPoint, productData);
  return response.data;
};

export const updateProduct = async (productData) => {
  const response = await axios.put(`${apiEndPoint}/${productData.id}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  await axios.delete(`${apiEndPoint}/${productId}`);
};
