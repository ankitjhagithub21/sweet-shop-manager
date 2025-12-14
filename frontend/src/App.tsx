
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";

import Loader from "./components/Loader";
import { RouterProvider } from "react-router-dom";
import router from "./components/Route";

const App = () => {
  const { loadUser, loadingUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, []);

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
