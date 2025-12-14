import { memo, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSweetStore } from "../store/useSweetStore";

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
    const hasFilter =
      name.trim() ||
      category !== "All" ||
      minPrice ||
      maxPrice;

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
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">

        {/* 🔍 Name Search */}
        <label className="input input-bordered flex items-center gap-2">
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

        {/* 💰 Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          name="minPrice"
          id="minPrice"
        />

        {/* 💰 Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          name="maxPrice"
          id="maxPrice"
        />
      </div>
    </div>
  );
});

export default SearchFilter;
