import { useState, useEffect } from "react";
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
      {loading ? (
        <div class="w-full flex items-center justify-center h-fit text-white">
          <div>
            <h1 class="text-2xl flex items-center">
              L
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="animate-spin"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
              </svg>{" "}
              ading . . .
            </h1>
          </div>
        </div>
      ) : errMsg ? (
        <p className="ml-4 text-lg font-semibold text-white">{errMsg}</p>
      ) : (
        <div className="relative p-10 shadow-xl rounded-xl w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-yellow-400 drop-shadow-md">
            Available Gifts
          </h1>
          <p className="text-lg italic text-gray-200 mt-2">
            "Find what you need, share what you don't."
          </p>
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
        </div>
      )}
    </div>
  );
}

export default MainPage;
