import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createProduct = createAsyncThunk(
  "createProduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5001/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response?.data;

  },
);

export const editProducts = createAsyncThunk(
  "editProduct",
  async ({ id, formData }) => {
    const response = await axios.patch(
      `http://localhost:5001/api/admin/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response?.data;
  },
);

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  const response = await axios.get("http://localhost:5001/api/admin/products/get");
  return response?.data;
});

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5001/api/admin/products/delete/${id}`,
    );
    return result?.data;
  },
);

const initialValue = {
  productList: [],
  isLoading: false,
};

const AdminProducSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;  
      state.productList = action.payload.data;
      console.log("createProduct", action.payload.data);
    });

    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    });

    builder.addCase(editProducts.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    });

    builder.addCase(getAllProducts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    });

    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default AdminProducSlice.reducer;
