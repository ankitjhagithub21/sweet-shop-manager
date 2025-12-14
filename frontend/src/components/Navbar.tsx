import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../constants";
import { BiPlus } from "react-icons/bi";
axios.defaults.withCredentials = true;

const Navbar = () => {
    const {user, logout} = useUserStore()

    const handleLogout = async() => {
        try{
            await axios.post(`${API_URL}/api/auth/logout`)
            logout()
        }catch(error){
            toast.error("Logout failed.")
        }
    }
  return (
    <div className="navbar bg-base-100 shadow-sm sticky">
      <div className="navbar-start">   
        <Link to={"/"} className="btn  bg-gray-200 text-xl">Sweet Shop</Link>
      </div>
      
      <div className="navbar-end">
        { user?.role === "admin" && <Link to={"/add"} className="btn"> <BiPlus/> Add Sweet</Link> }
        <button className="btn btn-secondary mx-2" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
