import { Link } from "react-router-dom";
import landingcar from "../assets/landingcar.jpg";

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
        <img
          src={landingcar}
          className="absolute top-0 left-0 h-full w-full object-cover"
          alt="Car Resale Image"
        />

        {/* Text on top of the image */}
        <div className="absolute mt-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black z-20">
          <h1 className="text-4xl font-extrabold">
            Welcome to CarX - Buy & Sell Cars with Confidence
          </h1>
          <p className="text-xl mt-4 max-w-lg mx-auto">
            Whether you&apos;re looking to buy your next car or sell your
            current one, we make it simple and reliable.
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
          <div className="col-span-12 flex justify-start absolute bottom-18 left-8 space-x-6">
            {" "}
            {/* Reduced space-x for closer buttons */}
            <Link
              to="/predict"
              className="bg-red-500 text-black font-extrabold text-sm px-6 py-3 rounded-full shadow-md hover:bg-red-600 transition duration-300"
            >
              Predict
            </Link>
            <Link
              to="/cars"
              className="bg-white text-black font-extrabold text-sm px-6 py-3 rounded-full shadow-md hover:bg-gray-300 transition duration-300"
            >
              View Cars
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
