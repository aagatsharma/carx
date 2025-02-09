/* eslint-disable react/prop-types */
import { useState, useRef, memo } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Camera, X } from "lucide-react";
import { useAuth } from "./auth-provider";

// Memoize the InputField component
const InputField = memo(
  ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    options = [],
  }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 p-2 w-full border rounded-md text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">{`Select ${label}`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`mt-1 p-2 w-full border rounded-md text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

InputField.displayName = "InputField";

const Predict = () => {
  const [formData, setFormData] = useState({
    car_name: "",
    brand: "",
    model: "",
    vehicle_age: "",
    km_driven: "",
    seller_type: "",
    fuel_type: "",
    transmission_type: "",
    mileage: "",
    engine: "",
    max_power: "",
    seats: "",
    image: null,
  });
  const { user } = useAuth();

  const [predictedPrice, setPredictedPrice] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  // Validation rules remain the same
  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "car_name",
      "brand",
      "model",
      "vehicle_age",
      "km_driven",
      "seller_type",
      "fuel_type",
      "transmission_type",
      "seats",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (!formData.image) {
      newErrors.image = "Please upload a car image";
    }

    if (
      formData.vehicle_age &&
      (isNaN(formData.vehicle_age) || formData.vehicle_age < 0)
    ) {
      newErrors.vehicle_age = "Please enter a valid age";
    }

    if (
      formData.km_driven &&
      (isNaN(formData.km_driven) || formData.km_driven < 0)
    ) {
      newErrors.km_driven = "Please enter valid kilometers";
    }

    if (
      formData.seats &&
      (isNaN(formData.seats) || formData.seats < 2 || formData.seats > 10)
    ) {
      newErrors.seats = "Please enter a valid number of seats (2-10)";
    }

    if (formData.mileage && isNaN(formData.mileage)) {
      newErrors.mileage = "Please enter valid mileage";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("user_id", user.id);

      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);

      // // Reset form
      // setFormData({
      //   car_name: "",
      //   brand: "",
      //   model: "",
      //   vehicle_age: "",
      //   km_driven: "",
      //   seller_type: "",
      //   fuel_type: "",
      //   transmission_type: "",
      //   mileage: "",
      //   engine: "",
      //   max_power: "",
      //   seats: "",
      //   image: null,
      // });
      // setImagePreview(null);
    } catch (error) {
      setSubmitError("Failed to submit form. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user)
    return (
      <div className="flex justify-center items-center py-10 min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Predict Car Price
          </h2>

          {submitError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit}>
            {/* Image Upload Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Image:
              </label>
              <div className="flex justify-center items-center w-full">
                {imagePreview ? (
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Car preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                    </label>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Car Name"
                name="car_name"
                placeholder="Enter Car Name"
                value={formData.car_name}
                onChange={handleChange}
                error={errors.car_name}
              />
              <InputField
                label="Brand"
                name="brand"
                placeholder="Enter Car Brand"
                value={formData.brand}
                onChange={handleChange}
                error={errors.brand}
              />
              <InputField
                label="Model"
                name="model"
                placeholder="Enter Car Model"
                value={formData.model}
                onChange={handleChange}
                error={errors.model}
              />
              <InputField
                label="Vehicle Age"
                name="vehicle_age"
                type="number"
                placeholder="Enter Car Age"
                value={formData.vehicle_age}
                onChange={handleChange}
                error={errors.vehicle_age}
              />
              <InputField
                label="KM Driven"
                name="km_driven"
                type="number"
                placeholder="Enter KM Driven"
                value={formData.km_driven}
                onChange={handleChange}
                error={errors.km_driven}
              />
              <InputField
                label="Seats"
                name="seats"
                type="number"
                placeholder="Enter Car Seats"
                value={formData.seats}
                onChange={handleChange}
                error={errors.seats}
              />
              <InputField
                label="Seller Type"
                name="seller_type"
                type="select"
                options={["Individual", "Dealer"]}
                value={formData.seller_type}
                onChange={handleChange}
                error={errors.seller_type}
              />
              <InputField
                label="Fuel Type"
                name="fuel_type"
                type="select"
                options={["Diesel", "Electric", "Petrol"]}
                value={formData.fuel_type}
                onChange={handleChange}
                error={errors.fuel_type}
              />
              <InputField
                label="Transmission Type"
                name="transmission_type"
                type="select"
                options={["Manual", "Automatic"]}
                value={formData.transmission_type}
                onChange={handleChange}
                error={errors.transmission_type}
              />
              <InputField
                label="Mileage"
                name="mileage"
                placeholder="Enter Mileage"
                value={formData.mileage}
                onChange={handleChange}
                error={errors.mileage}
              />
              <InputField
                label="Engine"
                name="engine"
                placeholder="Enter Engine"
                value={formData.engine}
                onChange={handleChange}
                error={errors.engine}
              />
              <InputField
                label="Max Power"
                name="max_power"
                placeholder="Enter Max Power"
                value={formData.max_power}
                onChange={handleChange}
                error={errors.max_power}
              />
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Predict and Sell"}
              </button>
            </div>

            <h1 className="text-center font-bold text-xl my-6">
              Predicted Price: {predictedPrice && `Rs. ${predictedPrice}`}
            </h1>
          </form>
        </div>
      </div>
    );
  else {
    return (
      <div className="min-h-screen flex flex-col gap-6 text-3xl font-semibold items-center justify-center">
        Please Login To Continue
        <a href="/login" className="bg-red-500 p-3 rounded cursor-pointer">
          <button>Login</button>
        </a>
      </div>
    );
  }
};

export default Predict;
