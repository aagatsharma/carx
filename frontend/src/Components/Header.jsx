import { Link } from "react-router-dom";
import re from "../assets/re.png";
import { useAuth } from "./auth-provider";
const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header className="flex sticky top-0 z-50 justify-between items-center h-20 p-4 bg-red-600 text-white">
      <div className="logo">
        <Link to="/">
          <img
            src={re}
            alt="Car Marketplace Logo"
            className=" h-40 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navbar Links on the right */}
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link to="/cars" className="hover:text-yellow-400">
              View Cars
            </Link>
          </li>
          <li>
            <Link to="/predict" className="hover:text-yellow-400">
              Predict
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-yellow-400">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400">
              Contact Us
            </Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" className="hover:text-yellow-400">
                Login
              </Link>
            </li>
          ) : (
            <li onClick={logout}>
              <Link to="/" className="hover:text-yellow-400">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
