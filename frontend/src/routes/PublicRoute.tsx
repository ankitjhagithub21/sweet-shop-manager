import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore"

const PublicRoute = ({children}:{children:React.ReactNode}) => {

    const {isAuthenticated} = useUserStore();

    if(isAuthenticated){
        return <Navigate to={"/"}/>
    }

  return (
    <>{children}</>
  )
}

export default PublicRoute