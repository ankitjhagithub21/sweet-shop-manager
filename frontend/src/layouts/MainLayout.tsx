import { Outlet } from "react-router-dom";
import { Suspense, lazy} from "react";
import Loader from "../components/Loader";


const Navbar = lazy(() => import("../components/Navbar"));

const MainLayout = () => {
   

  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <Outlet />
    </Suspense>
  );
};

export default MainLayout;
