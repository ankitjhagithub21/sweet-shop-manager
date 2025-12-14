import { useEffect } from "react";
import Sweets from "../components/Sweets";
import { useSweetStore } from "../store/useSweetStore";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const { sweets, loading, fetchSweets } = useSweetStore();

  useEffect(() => {
    fetchSweets();
  }, []);

   if (loading) return <Spinner />;

  return (
    <>
      {/* <Hero/> */}
      <Sweets sweets={sweets}/>
    </>
  );
};

export default HomePage;
