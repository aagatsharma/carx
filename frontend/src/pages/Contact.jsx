import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa"; // Import the phone icon from React Icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to backend or email)
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" }); // Reset form after submission
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-4">
      <header className="w-full max-w-6xl text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600">Contact Us</h1>
        <p className="text-lg text-gray-700 mt-4">
          Have any questions or need assistance? Reach out to us and we&apos;ll
          get back to you as soon as possible!
        </p>
      </header>

      <section className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          We&apos;d Love to Hear From You!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-lg">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 text-lg">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="5"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      <footer className="w-full max-w-6xl text-center mt-12">
        <p className="text-gray-600">
          Or contact us directly at{" "}
          <a href="mailto:support@carx.com" className="text-red-600">
            support@carx.com
          </a>
        </p>
        <p className="text-gray-600 mt-4 flex items-center justify-center">
          <FaPhoneAlt className="text-red-600 mr-2" />
          <a href="tel:+9779843xxxxxx" className="text-red-600">
            +977 9843 xxxxxx
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Contact;
