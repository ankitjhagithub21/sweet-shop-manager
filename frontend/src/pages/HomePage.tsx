import Sweets from "../components/Sweets";
import { useSweetStore } from "../store/useSweetStore";
import Spinner from "../components/Spinner";
import SearchFilter from "../components/SearchFilter";
import { memo } from "react";

const HomePage = memo(() => {
  
  const { sweets, loading} = useSweetStore();

 

  return (
    <div className="flex lg:flex-row flex-col px-5 py-10">
      <SearchFilter />
     { loading ? <Spinner/> :  <Sweets sweets={sweets} /> }
    </div>
  );
});

export default HomePage;
