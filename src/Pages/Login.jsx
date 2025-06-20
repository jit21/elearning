
import HomeLayout from "../Layout/HomeLayout";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

import { login } from "../Redux/Slices/AuthSlice.js";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loginData,setLoginData] = useState({
        
        email:"",
        password:""
    });
    function handleUserInput(e){
        const {name,value} = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]:value
        }));
    }
  
    async function onLogin(event) {
        event.preventDefault();
        if(!loginData.email || !loginData.password ) {
            toast.error("Please fill all the details");
            return;
        }

        
     

        

        // dispatch create account action
        const response = await dispatch(login(loginData));
        console.log(response.payload.success);
        if(response?.payload?.success){
            navigate("/");
            console.log("Account Login successfully");
        }

        setLoginData({
            
            email: "",
            password: "",
        });
        


    }
      
      
        

  return (
      <HomeLayout>
        <div className="flex items-center justify-center h-screen">
            <form noValidate onSubmit={onLogin} className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_10px_black] w-96">

                <h1 className="text-center text-2xl font-bold">Login Page</h1>
           
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input type="email" required name="email" id="email" placeholder="Enter your email"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handleUserInput}
                    value={loginData.email}
                    />

                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input type="password" required name="password" id="password" placeholder="Enter your password"
                    className="bg-transparent px-2 py-1 border"
                    onChange={handleUserInput}
                    value={loginData.password}
                    />

                </div>
                <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out text-lg mt-4">
                    Login
                </button>
                <p className="text-center">
                     <Link to="/forget-password" className="link text-accent cursor-pointer">Forget Password</Link>
                </p>
                <p className="text-center">
                    Do not have an account? <Link to="/signup" className="link text-accent cursor-pointer">Sign up</Link>
                </p>
            </form>

        </div>

      </HomeLayout>
    );
}
export default Login;
