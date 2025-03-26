import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../config";
import toast from "react-hot-toast";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState(6);
  const [searchResults, setSearchResults] = useState([]);
  const categories = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
  const conditions = ["New", "Like New", "Older"];

  useEffect(() => {
    fetchProducts();
  }, []);

  // fetch all products
  const fetchProducts = async () => {
    try {
      let url = `${urlConfig.backendUrl}/api/gifts`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
      return
    } catch (error) {
      toast.error(`Fetch error: ${error.message}`);
      console.log("Fetch error: " + error.message);
      return;
    }
  };

  const handleSearch = async () => {
    // Construct the search URL based on user input
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;
    const queryParams = new URLSearchParams({
      name: searchQuery,
      age_years: ageRange,
      category: document.getElementById("categorySelect").value,
      condition: document.getElementById("conditionSelect").value,
    }).toString();
    try {
      const response = await fetch(`${baseUrl}${queryParams}`);
      const data = await response.json();
      setSearchResults(data);
      return
    } catch (error) {
      toast.error(`Search error: ${error.message}`);
      console.error("Failed to fetch search results:", error);
      return
    }
  };

  const navigate = useNavigate();

  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
    return
  };

  return (
    <div className="pt-20 sm:pt-15 container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="w-full sm:w-3/4 bg-white shadow-lg p-6 rounded-lg bg-opacity-80 backdrop-blur-md">
          <div className="mb-5 p-4 border border-blue-800 rounded-lg">
            <h5 className="text-xl font-semibold text-center mb-4">Filters</h5>
            <div className="space-y-4">
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Category Dropdown */}
                <div className="w-full md:basis-[30%] ">
                  <label
                    htmlFor="categorySelect"
                    className="text-sm font-medium"
                  >
                    Category
                  </label>
                  <select
                    id="categorySelect"
                    className="w-full p-2 border rounded-lg mt-2"
                  >
                    <option value="">All</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Dropdown */}
                <div className="w-full md:basis-[30%] ">
                  <label
                    htmlFor="conditionSelect"
                    className="text-sm font-medium"
                  >
                    Condition
                  </label>
                  <select
                    id="conditionSelect"
                    className="w-full p-2 border rounded-lg mt-2"
                  >
                    <option value="">All</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age Range Slider */}
                <div className="w-full md:basis-[30%] ">
                  <label htmlFor="ageRange" className="text-sm font-medium">
                    Less than {ageRange} years
                  </label>
                  <input
                    type="range"
                    className="w-full mt-5"
                    id="ageRange"
                    min="1"
                    max="10"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg basis-[46%]"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="w-full bg-[#ff7f50] text-white p-3 rounded-lg hover:bg-[#ff5f40] transform transition duration-300 hover:scale-105 shadow-md cursor-pointer basis-[46%]"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-4 flex-wrap items-center justify-center">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product.id} className="mb-4 md:basis-[45%]">
                  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer">
                    {/* Check if product has an image and display it */}
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h5 className="text-lg font-semibold">{product.name}</h5>
                      <p className="text-gray-600 text-sm">
                        {product.description.slice(0, 100)}...
                      </p>
                      <p className="text-gray-600 text-sm">
                        {product.age_years.toFixed(1)} Years
                      </p>
                    </div>
                    <div className="bg-gray-100 p-4 flex justify-between items-center">
                      <button
                        onClick={() => goToDetailsPage(product.id)}
                        className="bg-[#ff7f50] text-white py-2 px-4 rounded-lg hover:bg-[#ff5f40] transform transition duration-300 hover:scale-105 shadow-md cursor-pointer"
                      >
                        Check Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg text-center">
                No products found. Please revise your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
