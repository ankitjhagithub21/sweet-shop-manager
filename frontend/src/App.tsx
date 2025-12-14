
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";

import Loader from "./components/Loader";
import { RouterProvider } from "react-router-dom";
import router from "./components/Route";
import { useSweetStore } from "./store/useSweetStore";

const App = () => {
  const { loadUser, loadingUser, user} = useUserStore();
  const {fetchSweets} = useSweetStore()

  useEffect(() => {
    loadUser()
    
  }, []);

  useEffect(()=>{
    if(user){
       fetchSweets()
    }
  },[user])

  

  if(loadingUser){
    return <Loader/>
  }

  
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
