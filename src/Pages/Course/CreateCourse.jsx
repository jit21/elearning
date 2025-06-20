import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from"../../Layout/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";


function CreateCourse(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [userInput, setUserInput]=useState({
        title:"",
        category:"",
        createdBy:"",
        description:"",
        thumbnail:null,
        previewImage:"",
    });
    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage=e.target.files[0];
        if(uploadedImage){
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setUserInput({
                    ...userInput,
                    previewImage:this.result,
                    thumbnail:uploadedImage,
                })
            })
        }

    }
    function handleUserInput(e){
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value,
        })

    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title || !userInput.category || !userInput.createdBy || !userInput.description || !userInput.thumbnail){
            toast.error("Please fill all the fields");
            return;
        }
        
        const response=await dispatch(createNewCourse(userInput));
        if(response?.payload?.success){
            setUserInput({
                title:"",
                category:"",
                createdBy:"",
                description:"",
                thumbnail:null,
                previewImage:"",
            })
            navigate("/courses")
        }
        

        
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] ">
            <form onSubmit={onFormSubmit} className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white
            w-[700px] my-10 shadow-[0_0_10px_black] relative">
               <AiOutlineArrowLeft
  onClick={() => navigate("/")}
  className="absolute top-8 text-2xl text-accent cursor-pointer"
/>

                <h1 className="text-center text-2xl font-bold">
                    Create New Course
                </h1>
                <main className="grid grid-cols-2 gap-x-10">
                    <div className="gap-y-6">
                        <div>
                            <label htmlFor="image_uploads" className="cursor-pointer">
                                {userInput.previewImage ?(
                                    <img src={userInput.previewImage} alt="" className="w-full h-44 m-auto border" />
                                ):(
                                    <div className="w-full h-44 m-auto border flex items-center justify-center text-center ">
                                        <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                    </div>
                                )}
                            </label>
                            <input type="file" className="hidden" id="image_uploads" accept=".jpg,.jpeg,.png"  name="image_uploads" onChange={handleImageUpload}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-lg font-semibold">
                                Course Title

                            </label>
                            <input type="text" required name="title" id="title" placeholder="Enter course title & title atleast 8 charcters"
                            className="bg-transparent px-2 py-1 border"
                            value={userInput.title} onChange={handleUserInput}/>
                            

                        </div>
                        

                    </div>
                    <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                          <label htmlFor="createdBy" className="text-lg font-semibold">
                                Course Instractor

                            </label>
                            <input type="text" required name="createdBy" id="createdBy" placeholder="Enter Instrauctor name"
                            className="bg-transparent px-2 py-1 border"
                            value={userInput.createdBy} onChange={handleUserInput}/>
                            

                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="category" className="text-lg font-semibold">
                                Course Category

                            </label>
                            <input type="text" required name="category" id="category" placeholder="Enter course catagory"
                            className="bg-transparent px-2 py-1 border"
                            value={userInput.category} onChange={handleUserInput}/>
                            

                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="description" className="text-lg font-semibold">
                                Course description

                            </label>
                            <textarea type="text" required name="description" id="description" placeholder="Enter course description & description atleast 20 charcters"
                            className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                            value={userInput.description} onChange={handleUserInput}/>
                            

                        </div>

                    </div>

                </main>
                <button type="submit" className="bg-yellow-600 text-white font-bold py-2 rounded-lg hover:bg-yellow-400 transition-all duration-300 ease-in-out text-lg ">
                    Create Course
                </button>

            </form>
            </div>
        </HomeLayout>
      

    )

}

export default CreateCourse;