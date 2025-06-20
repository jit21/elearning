import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState={
    courseData:[]
}
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "deleting course ...",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 
export const getAllCourses = createAsyncThunk("/course/get",async () => {
    try{
        const response=axiosInstance.get("courses/");
        toast.promise(response,{
            loading:"Loading courses...",
            success:"Courses fetched successfully",
            error:"Error while fetching courses"
        })

        return (await response).data.courses;



    }catch(err){
        toast.error("Something went wrong while fetching courses");
    }
        
}) 
export const createNewCourse= createAsyncThunk("/course/create",async (data) => {
    try{
        let formData=new FormData();
        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("createdBy",data.createdBy);
        // formData.append("thumbnail",data.thumbnail);
        formData.append("thumbnail", data.thumbnail);
        console.log("form data->",data.thumbnail);
        const response= axiosInstance.post("courses/",formData);
        toast.promise(response,{
            loading:"Creating new courses",
            success:"Course created Succesfully",
            error:"Failed to create course"

        })
        return (await response).data;


    }catch(err){
        toast.error(err?.response?.data?.message);

    }
        
})

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            if(action.payload){
                console.log(action.payload);
                state.courseData=[...action.payload];
            }
    })

                
    }
})
export default courseSlice.reducer;
        