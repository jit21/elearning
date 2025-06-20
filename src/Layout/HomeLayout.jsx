import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice.js";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn);
  const role=useSelector((state)=>state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 'auto';
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = '0px';
  }

  async function handleLogout(e) {
    e.preventDefault();
    const res= await dispatch(logout());
    if(res?.payload?.success){
      navigate("/");
  }
}

  return (
    <>
      <div className="min-h-[90vh] bg-gray-900"> {/* Dark grayish background for main layout */}
        <div className="drawer absolute left-0 z-50 w-fit">
          <input className="drawer-toggle" id="my-drawer" type="checkbox" />
          <div className="drawer-content bg-gray-900"> {/* Darker background for content */}
            <label htmlFor="my-drawer" className="cursor-pointer relative">
              {/* Make sure the icon is visible with white color */}
              <FiMenu size={'32px'} className="font-bold text-white m-4 z-50" onClick={changeWidth} />
            </label>
          </div>

          <div className="drawer-side w-0 bg-gray-900 bg-transparent"> {/* Dark gray for the drawer side */}
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative bg-gray-800 text-white">
              <li className="w-fit absolute right-2 z-50">
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24} />
                </button>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
                
              )}
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/course/create">Create new course</Link>
                </li>
                
              )}
              <li>
                <Link to="/courses">All Course</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              {!isLoggedIn && (
                <li className=" w-[90%]">
                  <div className="w-full flex items-center justify-center">
                    <button className="btn btn-primary mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out text-lg mr-4">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn btn-secondary mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4                 rounded-md transition-all duration-300 ease-in-out text-lg">
                      <Link to="/signup">Signup</Link>
                    </button>
                  </div>
                  </li>
                )}
                {isLoggedIn && (
                <li className=" w-[90%]">
                  <div className="w-full flex items-center justify-center">
                    <button className="btn btn-primary mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out text-lg mr-4">
                      <Link to="/user/profile">Profile</Link>
                    </button>
                    <button className="btn btn-secondary mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4                 rounded-md transition-all duration-300 ease-in-out text-lg">
                      <Link onClick={handleLogout}>Logout</Link>
                    </button>
                  </div>
                  </li>
                )}

            </ul>
          </div>
        </div>
        {children}
        <Footer className="bg-gray-900" /> {/* Footer with matching dark grayish background */}
      </div>
    </>
  );
}


export default HomeLayout;
