import { tesloApi } from '@/api/teloApi';
import type { Product } from '../interfaces/product.interface';
import { gerProductImageAction } from './get-products-iamge.actions';
export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    // const {data} = await tesloApi.get(`/products?page=${page}&limit=${limit}`);
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );

    return data.map((product) => ({
      ...product,
      images: product.images.map(gerProductImageAction),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
