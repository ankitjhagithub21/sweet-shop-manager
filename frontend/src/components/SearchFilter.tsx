import { memo, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSweetStore } from "../store/useSweetStore";

const SearchFilter = memo(() => {

 
  
  const { searchSweets, fetchSweets } = useSweetStore();

  const [text, setText] = useState("");

  
  useEffect(()=>{

   if(!text.trim()) {
    fetchSweets() 
    return;
   };

   const interval = setTimeout(()=>{
        searchSweets({name:text})
   },500)

   return () => {
      clearTimeout(interval)
   }

  },[text])
  

  return (
    <div className="container mx-auto py-10 ">
      <div className="mx-auto max-w-xl w-full flex gap-2 px-5">
        <label className="input w-full outline-none">
          <FaSearch />
          <input
            type="search"
            required
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}

          />
        </label>
      
      </div>
    </div>
  );
});

export default SearchFilter;
