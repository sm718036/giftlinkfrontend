import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../config";

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const fetchGifts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/gifts`);
      const data = await res.json();
      setGifts(data);
      console.log(data)
      setLoading(false);
    } catch (error) {
      setGifts([]);
      setLoading(false);
      setErrMsg("Error fetching gifts");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getConditionClass = (condition) =>
    condition === "New" ? "bg-green-500" : "bg-yellow-400";

  return (
    <div className="pt-20 min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-500 blur-lg -z-10"></div>
      <div className="relative p-10 shadow-xl rounded-xl w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-yellow-400 drop-shadow-md">
          Available Gifts
        </h1>
        <p className="text-lg italic text-gray-200 mt-2">
          "Find what you need, share what you don't."
        </p>
        {loading ? (
          <p className="ml-4 text-lg font-semibold text-white">
            Loading Products...
          </p>
        ) : errMsg ? (
          <p className="ml-4 text-lg font-semibold text-white">{errMsg}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full px-4">
            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
              >
                <img
                  src={gift.image || "/placeholder.png"}
                  alt={gift.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {gift.name}
                  </h2>
                  <p
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium text-white ${getConditionClass(
                      gift.condition
                    )}`}
                  >
                    {gift.condition}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(gift.date_added)}
                  </p>
                  <button
                    onClick={() => goToDetailsPage(gift.id)}
                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full shadow-md transition transform hover:scale-105 cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
