import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";


const initialState = {
isLoggedIn:localStorage.getItem('isLoggedIn') || false,
role: localStorage.getItem('role') || "",
data: localStorage.getItem('data')!==undefined ? JSON.parse(localStorage.getItem('data') ): {},


};
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})
export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! Authentication in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})
export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! Logging out..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile", async (formData) => {
    try {
        // ✅ Send FormData directly
        const res = axiosInstance.put("/user/update", formData);

        toast.promise(res, {
            loading: "Updating profile...",
            success: (res) => res?.data?.message || "Profile updated successfully",
            error: (err) => err?.response?.data?.message || "Failed to update profile"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
});

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})
  

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const user = action?.payload?.user;
            const token = action?.payload?.token;

    // Save both user and token
    localStorage.setItem("data", JSON.stringify({ ...user, token }));
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", user?.role);

    state.isLoggedIn = true;
    state.data = { ...user, token };
    state.role = user?.role;
        }).addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = null;
            state.role = null;
        }
    ).addCase(createAccount.fulfilled, (state, action) => {
      const user = action?.payload?.user;
      const token = action?.payload?.token;

      localStorage.setItem("data", JSON.stringify({ ...user, token }));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", user?.role);

      state.isLoggedIn = true;
      state.data = { ...user, token };
      state.role = user?.role;
        }
    ).addCase(getUserData.fulfilled,(state,action)=>{
        const user = action?.payload?.user;
      if (!user) return;

      const existingToken = JSON.parse(localStorage.getItem("data"))?.token || "";

      localStorage.setItem("data", JSON.stringify({ ...user, token: existingToken }));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", user?.role);

      state.isLoggedIn = true;
      state.data = { ...user, token: existingToken };
      state.role = user?.role;

    })

    }
});

export const {}=authSlice.actions;
export default authSlice.reducer;