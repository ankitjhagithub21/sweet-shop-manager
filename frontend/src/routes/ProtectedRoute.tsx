import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore"

const ProtectedRoute = ({children}:{children:React.ReactNode}) => {

    const {isAuthenticated} = useUserStore();

    if(!isAuthenticated){
        return <Navigate to={"/login"}/>
    }

  return (
    <>{children}</>
  )
}

export default ProtectedRoute