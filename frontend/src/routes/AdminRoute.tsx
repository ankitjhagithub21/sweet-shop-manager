import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore"

const AdminRoute = ({children}:{children:React.ReactNode}) => {

    const {user} = useUserStore();

    if(!user){
        return <Navigate to={"/login"}/>
    }

     if(user.role !== "admin"){
        return <Navigate to={"/"}/>
    }

  return (
    <>{children}</>
  )
}

export default AdminRoute