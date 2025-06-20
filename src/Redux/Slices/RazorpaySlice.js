import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import { act } from "react";
const initialState={
    key:"",
    subscriptionId:"",
    isPaymeentVerified:false,
    allPayments:{},
    finalMonths:{

    },
    monthylySalesRecords:[]
}
export const getRazorPayId= createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response =await axiosInstance.get("/payments/razorpay-key");
        return response.data;
        
    } catch (error) {
        toast.error("Something went wrong while fetching Razorpay ID");
    }
})
export const purchaseCourseBundle= createAsyncThunk("/purchaseCourse",async()=>{
    try {
        const response =await axiosInstance.post("/payments/subscribe");
        return response.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong while purchasing course bundle");
    }
})
export const verifyUserPayments= createAsyncThunk("/payments/verify",async(data)=>{
    try {
        const response =await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response.data;
        
    } catch (error) {
        toast.error("Something went wrong while verifying payment");
    }
})
export const getPaymentRecord= createAsyncThunk("/payments/record",async()=>{
    try {
        const response =axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Fetching payment records...",
            success: "Payment records fetched successfully",
            error: "Something went wrong while fetching payment records"
        });
        return (await response).data;
        
    } catch (error) {
        toast.error("Something went wrong while fetching payment records");
    }
})
export const cancelCourseBundle= createAsyncThunk("/razorpay/cancel",async()=>{
    try {
        const response =await axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Cancelling course bundle...",
            success: "Course bundle cancelled successfully",
            error: "Something went wrong while cancelling course bundle"
        });
        return response.data;
        
    } catch (error) {
        toast.error("Something went wrong while fetching Razorpay ID");
    }
})


const razorPaySlice = createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action.payload.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscriptionId = action.payload.subscriptionId;
        })
        .addCase(verifyUserPayments.fulfilled, (state, action) => {
            toast.success(action?.payload?.message || "Payment verified successfully");
            state.isPaymeentVerified = action?.payload?.success;
        }).addCase(verifyUserPayments.rejected, (state, action) => {
            toast.success(action?.payload?.message || "Payment verified rejected");
            state.isPaymeentVerified = action?.payload?.success;
        }).addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthylySalesRecords=action?.payload?.monthylySalesRecords;
        })

    }
})

export default razorPaySlice.reducer;