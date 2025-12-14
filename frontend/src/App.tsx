import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import Loader from "./components/Loader";
import { RouterProvider } from "react-router-dom";
import router from "./components/Route";
import { useEffect } from "react";

const App = () => {
  
  const { loadingUser, loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, []);

  

  if (loadingUser) {
    return <Loader />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
