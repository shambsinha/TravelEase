import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-blue-600/80 text-white">
      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Travel
          </span>
          <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Ease
          </span>
        </h1>

        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? "✖" : "☰"}
        </button>

        <nav className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6`}>
          <Link to="/" className="text-white hover:text-yellow-400" onClick={() => setIsOpen(false)}>HOME</Link>
          <Link to="/about" className="text-white hover:text-yellow-400" onClick={() => setIsOpen(false)}>ABOUT</Link>
          <Link to="/destinations" className="text-white hover:text-yellow-400" onClick={() => setIsOpen(false)}>DESTINATIONS</Link>
          <Link to="/packages" className="text-white hover:text-yellow-400" onClick={() => setIsOpen(false)}>PACKAGES</Link>
          <Link to="/contact" className="text-white hover:text-yellow-400" onClick={() => setIsOpen(false)}>CONTACT US</Link>
          <Link to="/profile" className="text-white hover:text-yellow-400" onClick={() => setIsOpen(false)}>Profile</Link>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-yellow-400 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-500 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;