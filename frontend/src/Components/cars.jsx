import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cars/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCars(data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.car_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image container with fixed aspect ratio */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.image ? `http://localhost:8000${car.image}` : ""}
                  alt={car.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content section */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {car.car_name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    Rs. {car.predicted_price}
                  </span>
                  <Link to={`/cars/${car.id}`}>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default Cars;
