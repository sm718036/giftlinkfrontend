import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 text-white text-center px-6 sm:px-12 py-12 overflow-hidden">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-white opacity-10 blur-2xl -z-10"></div>

      {/* SVG Illustration */}
      <div className="flex justify-center w-full">
        <img
          src="static/gifts-svg.svg"
          alt="Gift Sharing"
          className="w-40 sm:w-56 md:w-64 lg:w-72 mb-4 sm:mb-6 drop-shadow-lg animate-fadeIn"
        />
      </div>

      {/* Headings */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
        Welcome to <span className="text-yellow-400">GiftLink</span>
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 sm:mt-3 text-gray-200">
        Give What You Don't Need, Find What You Do
      </h2>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-4 max-w-lg sm:max-w-2xl text-gray-300 leading-relaxed">
        "One person's unused item is another's treasure. Let’s connect, share,
        and recycle together for a better tomorrow."
      </p>

      {/* Call to Action Button */}
      <Link
        to="/app"
        className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-purple-800 font-semibold text-lg sm:text-xl rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
      >
        Get Started 🚀
      </Link>
    </div>
  );
};

export default HomePage;
