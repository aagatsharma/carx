const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-4">
      <header className="w-full max-w-6xl text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600">About Us</h1>
        <p className="text-lg text-gray-700 mt-4">
          Welcome to CARX - Your trusted online marketplace for buying and
          selling cars.
        </p>
      </header>

      <section className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 text-lg">
          At CARX, we aim to provide a seamless, transparent, and convenient
          platform for car buyers and sellers. Whether you&apos;re looking for
          your dream car or ready to sell your vehicle, our platform connects
          you with potential buyers and sellers efficiently and safely.
        </p>
      </section>

      <section className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Why Choose CARX?
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>Wide selection of cars for sale, from new to used vehicles.</li>
          <li>Easy-to-use interface for posting ads and browsing listings.</li>
          <li>
            Secure transaction processes to ensure safety for both buyers and
            sellers.
          </li>
          <li>
            Competitive prices and deals to help you find the best car deals on
            the market.
          </li>
          <li>
            24/7 customer support to assist you with any questions or issues.
          </li>
        </ul>
      </section>

      <section className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Values
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          At CARX, we prioritize trust, transparency, and quality. Our team is
          dedicated to providing a safe and enjoyable experience for both buyers
          and sellers. We aim to make the car-buying process as stress-free as
          possible, ensuring that each transaction is handled with the highest
          level of integrity and professionalism.
        </p>
      </section>

      <footer className="w-full max-w-6xl text-center mt-12">
        <p className="text-gray-600">
          Thank you for choosing CARX. We look forward to helping you find your
          perfect car or sell your vehicle with ease.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
