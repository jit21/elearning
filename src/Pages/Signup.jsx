import HomeLayout from "../Layout/HomeLayout";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

import { createAccount } from "../Redux/Slices/AuthSlice";
function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage,setPreviewImage] = useState("");
    const [signupData,setSignupData] = useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    });
    function handleUserInput(e){
        const {name,value} = e.target;
        setSignupData((prev) => ({
            ...prev,
            [name]:value
        }));
    }
    function getImage(event){
        event.preventDefault();
        const uploadImage = event.target.files[0];
        if(uploadImage){
            setSignupData((prev) => ({
                ...prev,
                avatar:uploadImage
            }));
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load",() => {
                setPreviewImage(fileReader.result);
            }
            );

        }
    }
    async function createNewAccount(event) {
        event.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }

        // checking name field length
        if(signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return;
        }
        // checking valid email
        // if(!isEmail(signupData.email)) {
        //     toast.error("Invalid email id");
        //     return;
        // }
        // // checking password validation
        // if(!isValidPassword(signupData.password)) {
        //     toast.error("Password should be 6 - 16 character long with atleast a number and special character");
        //     return;
        // }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        console.log(response.payload.success);
        if(response?.payload?.success){
            navigate("/");
            console.log("Account created successfully");
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");


    }
      
      
        

  return (
      <HomeLayout>
        <div className="flex items-center justify-center h-screen">
            <form noValidate onSubmit={createNewAccount} className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_10px_black] w-96">

                <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                <label htmlFor="image_uploads" className="cursor-pointer" >
                    {previewImage ? (
                        <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                    ):(
                        <BsPersonCircle  className="w-24 h-24 rounded-full m-auto" />
                    )}

                </label>
                <input type="file" className="hidden" id="image_uploads" accept=".jpg,.jpeg,.png,.svg" name="image_uploads" onChange={getImage}/>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="fullName" className="font-semibold">Full Name</label>
                    <input type="text" required name="fullName" id="fullName" placeholder="Enter your Full Name"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handleUserInput}
                    value={signupData.fullName}
                    />

                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input type="email" required name="email" id="email" placeholder="Enter your email"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handleUserInput}
                    value={signupData.email}
                    />

                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input type="password" required name="password" id="password" placeholder="Enter your password"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handleUserInput}
                    value={signupData.password}
                    />

                </div>
                <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out text-lg mt-4">
                    Create Account
                </button>
                <p className="text-center">
                    Already have an account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                </p>
            </form>

        </div>

      </HomeLayout>
    );
}
export default Signup;