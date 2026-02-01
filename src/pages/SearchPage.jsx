import { useEffect, useState } from "react";
import { useSearchGifts } from "../hooks/giftHooks";
import SearchGiftCard from "../components/SearchGiftCard";
import { Pagination } from "../components/Pagination";
import Loader from "../components/Loader";

function SearchPage() {
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    ageInYears: 6,
    name: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    limit: 10,
  });

  const categories = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
  const conditions = ["New", "Like New", "Older"];

  const { foundGifts, isFindingGifts, paginationMeta } = useSearchGifts({
    ...debouncedFilters,
    ...paginationParams,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="pt-20 sm:pt-15 container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="w-full sm:w-3/4 bg-white shadow-lg p-6 rounded-lg bg-opacity-80 backdrop-blur-md">
          {/* Filters Panel */}
          <div className="mb-5 p-4 border border-blue-800 rounded-lg">
            <h5 className="text-xl font-semibold text-center mb-4">Filters</h5>
            <div className="space-y-4">
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Category */}
                <div className="w-full">
                  <label
                    htmlFor="categorySelect"
                    className="text-sm font-medium"
                  >
                    Category
                  </label>
                  <select
                    id="categorySelect"
                    className="w-full p-2 border rounded-lg mt-2"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="">All</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div className="w-full">
                  <label
                    htmlFor="conditionSelect"
                    className="text-sm font-medium"
                  >
                    Condition
                  </label>
                  <select
                    id="conditionSelect"
                    className="w-full p-2 border rounded-lg mt-2"
                    value={filters.condition}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        condition: e.target.value,
                      }))
                    }
                  >
                    <option value="">All</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age Slider */}
                <div className="w-full">
                  <label htmlFor="ageRange" className="text-sm font-medium">
                    Less than {filters.ageInYears} years
                  </label>
                  <input
                    type="range"
                    className="w-full mt-2"
                    id="ageRange"
                    min="1"
                    max="10"
                    value={filters.ageInYears}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        ageInYears: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Search Input */}
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Search for items..."
                  value={filters.name}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Gifts List */}
          <div className="mt-5 flex flex-col items-center justify-center">
            <div className="mt-5 flex gap-4 flex-wrap items-center justify-center">
              {isFindingGifts ? (
                <Loader />
              ) : foundGifts?.length > 0 ? (
                foundGifts.map((gift) => (
                  <SearchGiftCard key={gift.id} gift={gift} />
                ))
              ) : (
                <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg text-center">
                  No products found. Please revise your filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            {foundGifts?.length > 0 ? (
              <Pagination
                totalPages={paginationMeta?.totalPages}
                currentPage={paginationParams.currentPage}
                onPageChange={(nextPage) =>
                  setPaginationParams((prev) => ({
                    ...prev,
                    currentPage: nextPage,
                  }))
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
