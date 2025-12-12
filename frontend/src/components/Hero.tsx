import { useState } from "react";

const Hero = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", search);
    // later: navigate or call filter API
  };

  return (
    <div
      className="hero min-h-[60vh]"
      style={{
        backgroundImage:
          "url(https://static.vecteezy.com/system/resources/thumbnails/000/100/287/small/sweets-pattern-background-vector.jpg)",
      }}
    >
      <div className="hero-overlay bg-black/50"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-xl">

          <h1 className="mb-4 text-5xl font-bold text-white ">
            Discover Delicious Sweets 🍬
          </h1>

          <p className="mb-8 text-lg text-gray-200">
            Explore our wide variety of traditional and modern sweets.
            Search by name or category and manage your sweet inventory easily.
          </p>

          {/* 🔍 Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="text"
              placeholder="Search sweets (e.g. Rasgulla, Kaju Katli)"
              className="input input-bordered w-full max-w-md text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="btn "
            >
              Search
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Hero;
