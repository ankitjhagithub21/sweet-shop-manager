import Sweets from "../components/Sweets";
import { useSweetStore } from "../store/useSweetStore";
import Spinner from "../components/Spinner";
import SearchFilter from "../components/SearchFilter";
import { memo } from "react";

const HomePage = memo(() => {
  
  const { sweets, loading} = useSweetStore();

 

  return (
    <>
      <SearchFilter />
     { loading ? <Spinner/> :  <Sweets sweets={sweets} /> }
    </>
  );
});

export default HomePage;
