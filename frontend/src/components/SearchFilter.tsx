import { memo, useEffect, useState } from "react";
import { FaCross, FaSearch } from "react-icons/fa";
import { useSweetStore } from "../store/useSweetStore";
import { div } from "framer-motion/client";
import { FaX } from "react-icons/fa6";

const categories = [
  "All",
  "Indian Dessert",
  "Chocolate",
  "Dry Fruit",
  "Bengali",
];

const SearchFilter = memo(() => {
  const { searchSweets, fetchSweets } = useSweetStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const hasFilter = name.trim() || category !== "All" || minPrice || maxPrice;

    if (!hasFilter) {
      fetchSweets();
      return;
    }

    const timeout = setTimeout(() => {
      searchSweets({
        name: name || undefined,
        category: category !== "All" ? category : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [name, category, minPrice, maxPrice]);

  return (
    
   <div className="shadow-lg h-fit p-5 rounded-lg">

    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg">Filters</h2>
      <button className="btn btn-secondary"> <FaX/> Clear All</button>
    </div>

     <div className="flex  lg:flex-col flex-row  gap-2 lg:gap-0 lg:w-[280px] w-full">
     
      <div>
        <div className="text-sm text-gray-600 mb-2">
          <label htmlFor="name" className="text-sm text-gray-600 mb-2">
            Search by name
          </label>
          {/* 🔍 Name Search */}
          <label className="input input-bordered outline-none flex items-center gap-2 mt-2">
            <FaSearch />
            <input
              type="search"
              placeholder="Search sweets"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm text-gray-600 mb-2">
            Minimum Price
          </label>
          {/* 💰 Min Price */}
          <input
            type="number"
            className="input input-bordered outline-none"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            name="minPrice"
            id="minPrice"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm text-gray-600 mb-2">
            Maximum Price
          </label>
          {/* 💰 Max Price */}
          <input
            type="number"
            className="input input-bordered outline-none"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            name="maxPrice"
            id="maxPrice"
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="category" className="text-sm text-gray-600 mb-2">
            Category
          </label>
          {/* 🍩 Category Filter */}
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
   </div>
  );
});

export default SearchFilter;
