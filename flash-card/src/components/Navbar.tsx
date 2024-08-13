import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios'; // Make sure axios is installed
import { cookies } from "next/headers";

interface MyToken {
  name: string;
  username: string;
  id: string;
  role: string; // Add role to MyToken
}

export const isAuthenticated = async () => {
    try{
        console.log("Is Authenticated")
        const response = await axios.get("/api/Admin/getAdmin/");
        console.log(response.status);
        return response;
    }
    catch(e){
        console.log(e);
        return ;     
    }
  }
export const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Add state for user role
  const navigate = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('/api/Admin/getAdmin/');
        console.log(response);
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUsername(response.data.user.email);
          setIsAdmin(response.data.user.role === 'ADMIN'); // Check user role
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    const responce = await axios.get("/api/Admin/signout")
    setIsLoggedIn(false);
    setUsername('');
    setIsAdmin(false);
  };

  return (
    <nav className="p-4 w-full shadow-md shadow-purple-800">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <Link href="/" className="text-black text-xl font-semibold items-center ml-3 flex">
          <div className="text-2xl text-purple-600">
            Card-Components
          </div>
        </Link>
        <div className="flex items-center justify-center space-x-4 mt-4 md:mt-0">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link
                  href="/publish"
                  className="text-black bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
                >
                  New
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="text-black bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
                >
                  Dashboard
                </Link>
              )}
              <div className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                  <Avatar size={"big"} name={username} />
                </button>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform duration-200 origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 ease-in-out"
                        role="menuitem"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/signin"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return (
    <div className={`flex justify-center bg-purple-800 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={`${size === "small" ? "text-xs" : "text-xl"} m-auto font-extralight text-black dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}

export default Navbar;