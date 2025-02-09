import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCars = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/api/cars/${id}/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCar(data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars(id);
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative size-60">
          <img
            src={car.image ? `http://localhost:8000${car.image}` : ""}
            alt={car.car_name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">
            {car.car_name} - Rs. {car.predicted_price}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Brand:</strong> {car.brand}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Vehicle Age:</strong> {car.vehicle_age} years
            </p>
            <p>
              <strong>KM Driven:</strong> {car.km_driven} km
            </p>
            <p>
              <strong>Seller Type:</strong> {car.seller_type}
            </p>
            <p>
              <strong>Fuel Type:</strong> {car.fuel_type}
            </p>
            <p>
              <strong>Transmission Type:</strong> {car.transmission_type}
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage} kmpl
            </p>
            <p>
              <strong>Engine:</strong> {car.engine} cc
            </p>
            <p>
              <strong>Max Power:</strong> {car.max_power} bhp
            </p>
            <p>
              <strong>Seats:</strong> {car.seats}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
