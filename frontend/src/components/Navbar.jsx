import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { FaUser, FaCaretDown } from 'react-icons/fa'; // Import the account icon and dropdown icon
import useLogout from '../hook/useLogout';
import { useAuthContext } from '../hook/useAuthContext';

const NavBar = () => {
  const { user } = useAuthContext();
  const { LogOut } = useLogout();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    LogOut();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownRef = useRef(null); // Create a ref for the dropdown

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-900 p-4 shadow-md shadow-black ">
      <div className="container mx-auto flex justify-between items-center px-10">
        <Link to="/" className="text-white font-bold text-xl font-sans">
          Rep.Up
        </Link>
        <div>
          {user && (
            <div className="relative">
              <div onClick={toggleDropdown} className="cursor-pointer flex items-center text-white">
                <FaUser /> {/* Render the account icon */}
                <span className="ml-2">{user.name}</span>
                <FaCaretDown className={`ml-2 transition-transform transform ${dropdownOpen ? 'rotate-180' : ''}`} /> {/* Render the dropdown icon */}
              </div>
              {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white shadow-md rounded-md">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left p-2 hover-bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!user && (
            <div>
              {isLoginPage ? (
                <Link
                  to="/signup"
                  className="px-2 pb-2 pt-1 rounded-md bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition ease-in-out"
                >
                  SignUp
                </Link>
              ) : null}
              {isSignupPage ? (
                <Link
                  to="/login"
                  className="px-2 pb-2 pt-1 rounded-md bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition ease-in-out"
                >
                  Login
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
      {/* <hr className='mt-4 border-gray-800'/> */}
    </nav>
  );
};

export default NavBar;
