import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';
import type { Product } from '../types/product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await productsApi.getAll();
});

export const createProduct = createAsyncThunk('products/createProduct', async (product: Omit<Product, 'id'>) => {
  return await productsApi.add(product);
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
  return await productsApi.delete(id);
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message ?? 'Fetch failed';
      state.loading = false;
    });

    builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    });
  }
});

export default productsSlice.reducer;
