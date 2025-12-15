import Sweets from "../components/Sweets";
import { useSweetStore } from "../store/useSweetStore";
import SearchFilter from "../components/SearchFilter";
import { memo } from "react";

const HomePage = memo(() => {
  const { sweets, loading } = useSweetStore();

  return (
    <div className="flex lg:flex-row flex-col px-5 py-10">
      <SearchFilter />
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 p-5">
          {[...Array(6).keys()].map((n) => {
            return (
              <div className="flex  flex-col gap-4" key={n}>
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            );
          })}
        </div>
      ) : (
        <Sweets sweets={sweets} />
      )}
    </div>
  );
});

export default HomePage;
