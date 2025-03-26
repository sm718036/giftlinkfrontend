import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { urlConfig } from "../config";
import toast from "react-hot-toast";

function DetailsPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticationToken = sessionStorage.getItem("auth-token");
    if (!authenticationToken) {
      navigate("/app/login");
    }
    // get the gift to be rendered on the details page
    const fetchGift = async () => {
      try {
        const url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGift(data);
        return;
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchGift();
    window.scrollTo(0, 0);
  }, [productId, navigate]);

  const handleBackClick = () => {
    navigate(-1);
    return;
  };

  //The comments have been hardcoded for this project.
  const comments = [
    {
      author: "John Doe",
      comment: "I would like this!",
    },
    {
      author: "Jane Smith",
      comment: "Just DMed you.",
    },
    {
      author: "Alice Johnson",
      comment: "I will take it if it's still available.",
    },
    {
      author: "Mike Brown",
      comment: "This is a good one!",
    },
    {
      author: "Sarah Wilson",
      comment:
        "My family can use one. DM me if it is still available. Thank you!",
    },
  ];

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading)
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  if (!gift)
    return (
      <div className="text-center text-gray-600 mt-10">Gift not found</div>
    );

  return (
    <div className="pt-30 max-w-4xl mx-auto p-6">
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900  px-4 py-2 rounded-md mb-6 transition cursor-pointer"
        onClick={handleBackClick}
      >
        Back
      </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg text-white p-6 text-center">
          <h2 className="text-3xl font-bold">{gift.name}</h2>
        </div>
        <div className="p-6">
          <div className="w-full max-w-3xl mx-auto mb-6">
            {gift.image ? (
              <img
                src={gift.image}
                alt={gift.name}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            ) : (
              <div className="text-center text-gray-500 font-semibold py-12 bg-gray-100 rounded-lg">
                No Image Available
              </div>
            )}
          </div>
          <div className="space-y-2 text-lg">
            <p>
              <strong>Category:</strong> {gift.category}
            </p>
            <p>
              <strong>Condition:</strong> {gift.condition}
            </p>
            <p>
              <strong>Date Added:</strong> {formatDate(gift.date_added)}
            </p>
            <p>
              <strong>Age (Years):</strong> {gift.age_years}
            </p>
            <p>
              <strong>Description:</strong> {gift.description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800">Comments</h3>
        <div className="space-y-4 mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow">
              <p className="font-semibold text-gray-800">
                <strong>{comment.author}:</strong>
              </p>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
