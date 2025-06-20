import HomeLayout from "../Layout/HomeLayout";
import { Link } from "react-router-dom";
import HomePageImage from"../Assets/Images/HomePageImage.jpg";
function HomePage(){
    return(
        <HomeLayout>
  <div className="pt-10 text-white flex items-center justify-center mx-16 h-[90vh]">
    <div className="w-full text-center">
      <h1 className="text-5xl font-semibold text-white">
        Find out best <span className="text-yellow-500 font-bold">Online Courses</span>
      </h1>
      <p className="text-xl text-gray-200">

        We have a large library of online courses to help you learn new skills and advance your career.

      </p>
      <div className="space-x-6">
        <Link to='/courses'>
        <button className="btn btn-primary mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out text-lg">
          Explore Courses
        </button>
        </Link>
        <Link to='/contact'>
        <button className="btn btn-secondary mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out text-lg">
          Contact Us
        </button>
        </Link>
      </div>
    </div>
    <div className="w-1/2 flex justify-center items-center ml-[+30px]">
          <img src={HomePageImage} alt="homepage image" className="h-auto shadow-lg rounded-3xl w-full" />
    </div>
  </div>
</HomeLayout>



    );


}

export default HomePage;